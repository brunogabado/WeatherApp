import "@testing-library/jest-dom";
import { getAllByTestId, render, screen } from "@testing-library/react";
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
  expect(registerForm).toBeInTheDocument();
  const closeRegisterBtn = screen.getByTestId("closeRegisterModalBtn");
  const changeToLoginLink = screen.getByTestId("changeToLoginLink");
  //close the modal
  await user.click(closeRegisterBtn);
  expect(registerForm).not.toBeInTheDocument();

  // login:
  await user.click(loginButton);
  let loginForm = screen.queryByTestId("loginForm");
  expect(loginForm).toBeInTheDocument();
  const closeLoginBtn = screen.getByTestId("closeLoginModalBtn");
  const changeToRegisterLink = screen.getByTestId("changeToRegisterLink");

  //TESTING THE LINKS INSIDE THE FORM TO CHANGE THE TYPE OF THE FORM TO LOGIN/REGISTER

  //
  await user.click(changeToRegisterLink);
  setTimeout(async () => {
    expect(loginForm).not.toBeInTheDocument();
    expect(registerForm).toBeInTheDocument();
    await user.click(changeToLoginLink);
  }, 500);

  //

  setTimeout(async () => {
    expect(loginForm).toBeInTheDocument();
    expect(registerForm).not.toBeInTheDocument();
    await user.click(closeLoginBtn);
  }, 500);

  //close the modal
  setTimeout(() => {
    expect(loginForm).not.toBeInTheDocument();
  }, 500);
});

test("Testing the forecast feature ", async () => {
  render(
    <Provider store={store}>
      <HomePage isLogged={false} />
    </Provider>,
  );

  const searchInput = screen.getByPlaceholderText("Search for a city...");

  //writing Lamarosa in the search input to get the results
  await user.click(searchInput);
  await user.keyboard("Lamarosa");

  setTimeout(async () => {
    //getting the reusults
    const listOfOptions = screen.getByRole("list");
    const options = screen.getAllByRole("listitem");
    // made some assumptions
    expect(listOfOptions).toBeInTheDocument();
    expect(options).toHaveLength(5);
    //clicking on one option to render the forecast
    await user.click(options[0]);
  }, 500);

  setTimeout(() => {
    const forecastDashboards = screen.getAllByTestId("forecastDashboard");
    expect(forecastDashboards).toHaveLength(6)
  }, 500);
});
