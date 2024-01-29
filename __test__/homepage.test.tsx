import "@testing-library/jest-dom";
import { render, screen, within } from "@testing-library/react";
import user from "@testing-library/user-event";
import HomePage from "@/pages/index";
import { Provider } from "react-redux";
import { store } from "@/state/store";
import { useRouter } from "next/router";

jest.mock("next/router", () => ({
  ...jest.requireActual("next/router"),
  useRouter: jest.fn(),
}));

test("testing the modal of Login and Register", async () => {
  const mockRouter = {
    route: "/", // set the current route
    query: {
      /* mock query parameters if needed */
    },
    push: jest.fn(), // mock the push function if needed
  };

  const mockUseRouter = useRouter as jest.Mock;
  mockUseRouter.mockReturnValue(mockRouter);

  render(
    <Provider store={store}>
      <HomePage isLogged={false} />
    </Provider>,
  );

  const registerButton = screen.getByRole("button", { name: /register/i });
  const loginButton = screen.getByRole("button", { name: /login/i });

  //check if the opening and the closing feature of the form is working

  //   register:
  await user.click(registerButton);
  let registerForm = screen.queryByTestId("registerForm");
  console.log("1111111111111111111111111", registerForm);
  expect(registerForm).toBeInTheDocument();
  const closeRegisterBtn = screen.getByTestId("closeRegisterModalBtn");
  const changeToLoginLink = screen.getByTestId("changeToLoginLink");
  //close the modal
  await user.click(closeRegisterBtn);
  expect(registerForm).not.toBeInTheDocument();
  console.log("22222222222222222222222222222", registerForm);

  // login:
  await user.click(loginButton);
  let loginForm = screen.queryByTestId("loginForm");
  expect(loginForm).toBeInTheDocument();
  const closeLoginBtn = screen.getByTestId("closeLoginModalBtn");
  const changeToRegisterLink = screen.getByTestId("changeToRegisterLink");

  //TESTING THE LINKS INSIDE THE FORM TO CHANGE THE TYPE OF THE FORM TO LOGIN/REGISTER

  //
  await user.click(changeToRegisterLink);
  setTimeout(() => {
    expect(loginForm).not.toBeInTheDocument();
    expect(registerForm).toBeInTheDocument();
    user.click(changeToLoginLink);
  }, 100);

  //

  setTimeout(() => {
    expect(loginForm).toBeInTheDocument();
    expect(registerForm).not.toBeInTheDocument();
  }, 100);

  //close the modal
  await user.click(closeLoginBtn);
  expect(loginForm).not.toBeInTheDocument();
});

test("Testing the forecast feature ", async () => {});
