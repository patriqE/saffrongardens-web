import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import GlobalPlannerBubble from "@/components/public/GlobalPlannerBubble";

const routerPushMock = jest.fn();
const trackUiEventMock = jest.fn();

jest.mock("next/image", () => (props) => (
  // eslint-disable-next-line @next/next/no-img-element
  <img alt={props.alt} src={props.src} />
));

jest.mock("next/navigation", () => ({
  usePathname: () => "/",
  useRouter: () => ({
    push: routerPushMock,
  }),
}));

jest.mock("@/lib/chatbotConfig", () => ({
  chatbotEnabled: true,
  plannerOverrideLabel: "Chat with Planner",
}));

jest.mock("@/lib/uiAnalytics", () => ({
  trackUiEvent: (...args) => trackUiEventMock(...args),
}));

describe("GlobalPlannerBubble e2e flows", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
    window.sessionStorage.clear();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test("opens and closes with keyboard and restores focus", () => {
    render(<GlobalPlannerBubble />);

    const trigger = screen.getByRole("button", { name: "Chat with Planner" });
    trigger.focus();
    fireEvent.click(trigger);

    const closeButton = screen.getByRole("button", {
      name: "Close planner chat",
    });
    expect(closeButton).toBeInTheDocument();
    expect(closeButton).toHaveFocus();

    fireEvent.keyDown(document, { key: "Escape" });

    expect(
      screen.queryByRole("button", { name: "Close planner chat" }),
    ).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  test("dismiss hides bubble for session", () => {
    render(<GlobalPlannerBubble />);

    fireEvent.click(
      screen.getByRole("button", {
        name: "Dismiss assistant bubble for this session",
      }),
    );

    expect(
      screen.queryByRole("button", { name: "Chat with Planner" }),
    ).not.toBeInTheDocument();
    expect(window.sessionStorage.getItem("globalPlannerBubbleDismissed")).toBe(
      "1",
    );
  });

  test("shows fallback CTA after embed timeout and opens full chat", () => {
    render(<GlobalPlannerBubble />);

    fireEvent.click(screen.getByRole("button", { name: "Chat with Planner" }));

    expect(
      screen.getByText("Loading your planner chat..."),
    ).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(2500);
    });

    const fullChatButton = screen.getByRole("button", {
      name: "Open full chat with planner",
    });
    fireEvent.click(fullChatButton);

    expect(routerPushMock).toHaveBeenCalledWith("/chat?planner=true");
  });

  test("closes on outside click", () => {
    render(<GlobalPlannerBubble />);

    fireEvent.click(screen.getByRole("button", { name: "Chat with Planner" }));
    expect(
      screen.getByRole("button", { name: "Close planner chat" }),
    ).toBeInTheDocument();

    fireEvent.mouseDown(document.body);

    expect(
      screen.queryByRole("button", { name: "Close planner chat" }),
    ).not.toBeInTheDocument();
  });

  test("tracks key bubble analytics events", () => {
    render(<GlobalPlannerBubble />);

    fireEvent.click(screen.getByRole("button", { name: "Chat with Planner" }));
    act(() => {
      jest.advanceTimersByTime(2500);
    });

    fireEvent.click(
      screen.getByRole("button", {
        name: "Open full chat with planner",
      }),
    );

    expect(trackUiEventMock).toHaveBeenCalledWith("planner_bubble_open", {
      source: "floating_button",
    });
    expect(trackUiEventMock).toHaveBeenCalledWith(
      "planner_bubble_embed_timeout",
      {
        timeoutMs: 2500,
      },
    );
    expect(trackUiEventMock).toHaveBeenCalledWith(
      "planner_bubble_open_full_chat",
      {
        source: "embed_timeout",
      },
    );
  });
});
