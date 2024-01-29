import "@testing-library/jest-dom";
import { render, screen, within } from "@testing-library/react";
import user from "@testing-library/user-event";
import ProfilePage from "@/pages/Profile";
import { Provider } from "react-redux";
import { store } from "@/state/store";

const userData = {
  id: 1,
  name: "Bruno",
  email: "brunogabado@hotmail.com",
  userCity: { name: "Lamarosa", longitude: 40, latitude: -8 },
  userList: [
    { name: "Torres Novas", longitude: 2, latitude: 4 },
    { name: "Porto", longitude: 8, latitude: 35 },
  ],
  listID: 1,
};

const userCityForecast = {
  location: {
    localtime: "2024-01-16 20:00",
  },

  forecast: {
    forecastday: [
      {
        day: {
          maxtemp_c: 20,
          mintemp_c: 10,
          maxwind_kph: 3,
          condition: {
            code: 5,
            icon: "rainy",
          },
        },
      },
      {
        day: {
          maxtemp_c: 20,
          mintemp_c: 10,
          maxwind_kph: 3,
          condition: {
            code: 5,
            icon: "rainy",
          },
        },
      },
    ],
  },
};

const citiesListForecast = [
  {
    location: {
      localtime: "2024-01-16 21:00",
    },

    forecast: {
      forecastday: [
        {
          day: {
            maxtemp_c: 20,
            mintemp_c: 10,
            maxwind_kph: 3,
            condition: {
              code: 5,
              icon: "rainy",
            },
          },
        },
        {
          day: {
            maxtemp_c: 20,
            mintemp_c: 10,
            maxwind_kph: 3,
            condition: {
              code: 5,
              icon: "rainy",
            },
          },
        },
      ],
    },
  },
  {
    location: {
      localtime: "2024-01-16 22:00",
    },

    forecast: {
      forecastday: [
        {
          day: {
            maxtemp_c: 20,
            mintemp_c: 10,
            maxwind_kph: 3,
            condition: {
              code: 5,
              icon: "rainy",
            },
          },
        },
        {
          day: {
            maxtemp_c: 20,
            mintemp_c: 10,
            maxwind_kph: 3,
            condition: {
              code: 5,
              icon: "rainy",
            },
          },
        },
      ],
    },
  },
];

const interactInput = async (input: HTMLInputElement, word: string) => {
  await user.click(input);
  await user.keyboard(word);

  setTimeout(async () => {
    const listOfOptions = screen.getByRole("list");
    const options = screen.getAllByRole("listitem");

    expect(listOfOptions).toBeInTheDocument();
    expect(options).toHaveLength(5);
    await user.click(options[0]);
  }, 1500);

  const newListItem = screen.getByText(`${input}`);
  expect(newListItem).toBeInTheDocument();
};

const buttonInteraction = async (button: HTMLButtonElement, day: string) => {
  const comparisonIsBeingMade = screen.queryByText("You have not selected your city or the list is empty.") === null;

  if (comparisonIsBeingMade) {
    await user.click(button);

    const comparisonTitle = screen.getByRole("heading", day === "Today" ? { name: /today/i } : { name: /tomorrow/i });
    expect(comparisonTitle).toBeInTheDocument();
  }
};

// When test it all, the testing will be slowly because the multiple renders of the full page.

test("Check if the info Button opens the infoModal, and if the modal closes well", async () => {
  render(
    <Provider store={store}>
      <ProfilePage userData={userData} userCityForecast={userCityForecast} citiesListForecast={citiesListForecast} isLogged={true} />
    </Provider>,
  );

  const infoButton = screen.getByTestId("infoButton");

  await user.click(infoButton);

  const infoModal = screen.getByTestId("infoModal");
  const closeModalButton = within(infoModal).getByTestId("closeInfoModalBtn");

  expect(infoModal).toBeInTheDocument();
  expect(closeModalButton).toBeInTheDocument();

  await user.click(closeModalButton);

  expect(infoModal).not.toBeInTheDocument();
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

test("Check if the search inputs are working as expected to add a city to the list", async () => {
  render(
    <Provider store={store}>
      <ProfilePage userData={userData} userCityForecast={userCityForecast} citiesListForecast={citiesListForecast} isLogged={true} />
    </Provider>,
  );

  const [listCitiesInput, userCityInput]: HTMLInputElement[] = screen.getAllByRole("textbox");
  //Search in each input for a City and click in the first option to check if results in the suposed effect.
  interactInput(listCitiesInput, "Lisboa, Portugal");
  interactInput(userCityInput, "Lamarosa, Torres Novas, Portugal");
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

test("Check if the button click on another date, change the date of the comparison", async () => {
  render(
    <Provider store={store}>
      <ProfilePage userData={userData} userCityForecast={userCityForecast} citiesListForecast={citiesListForecast} isLogged={true} />
    </Provider>,
  );

  const todayButton: HTMLButtonElement = screen.getByRole("button", { name: /today/i });
  const tomorrowButton: HTMLButtonElement = screen.getByRole("button", { name: /tomorrow/i });

  buttonInteraction(todayButton, "Today");
  buttonInteraction(tomorrowButton, "Tomorrow");
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

test("Test if the comparisons are being made if the list is not empty as the user have a city choosed", () => {
  render(
    <Provider store={store}>
      <ProfilePage userData={userData} userCityForecast={userCityForecast} citiesListForecast={citiesListForecast} isLogged={true} />
    </Provider>,
  );

  const comparisonIsBeingMade = screen.queryByText("You have not selected your city or the list is empty.") === null;

  //if no comparison is being made, finish the test
  if (!comparisonIsBeingMade) {
    return;
  }

  //get and check the existance of the user city dashboard (1) and its params (5)
  const userCityDashboard = screen.getByTestId("userCityDashboard");
  const dashboardTitle = within(userCityDashboard).getByTestId("dashboardTitle");
  const dashboardParams = within(userCityDashboard).getAllByTestId("dashboardParam");

  expect(userCityDashboard).toBeInTheDocument();
  expect(dashboardTitle).toBeInTheDocument();
  expect(dashboardParams).toHaveLength(5);

  //get and check the existance of the comparisons dahsboards (2) and its params (5 for each)
  const comparisonDashboards = screen.getAllByTestId("comparisonDashboard");

  comparisonDashboards.map((dashboard) => {
    const comparisonDashboardTitle = within(dashboard).getByTestId("comparisonDashboardTitle");
    const comparisonDashboardParams = within(dashboard).getAllByTestId("comparisonDashboardParam");

    expect(comparisonDashboardTitle).toBeInTheDocument();
    expect(comparisonDashboardParams).toHaveLength(5);
  });
  expect(comparisonDashboards).toHaveLength(2);
});
