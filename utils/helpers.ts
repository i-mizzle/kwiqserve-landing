import { CountryStates } from "@/assets/static/static/country-states";
import { StatesLgas } from "@/assets/static/static/stateslgas";

export const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export interface UserDetails {
  _id: string
  firstName: string
  email: string
  lastName: string
  phone: string
  // add other fields you expect
}

export const slugify = (string: string) => {
  if(!string) return ''
  
  return string
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-zA-Z0-9\s]/g, '') // remove special characters
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
};

export const debounce = <T extends unknown[]>(func: (...args: T) => void, timeout = 1000) => {
  let timer: ReturnType<typeof setTimeout>;
  return function(this: unknown, ...args: T) {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), timeout);
  };
}

export const userDetails = (): UserDetails | null => {
  if (typeof window === "undefined") return null; 
  const data = localStorage.getItem("user");
  if (!data) return null;

  try {
    return JSON.parse(data) as UserDetails;
  } catch (error) {
    console.error("Failed to parse user details from localStorage", error);
    return null;
  }
};

export const authHeader = () => {
  if (typeof window === "undefined") return {}
  const authToken = localStorage.getItem("authToken");
  if (authToken) {
    return { Authorization: "Bearer " + authToken };
  }
  return {};
};


export const parseNigerianStates = () => {
    const statesArray = []

    for (const [key, value] of Object.entries(CountryStates.NG.divisions)) {
        statesArray.push({
            label: value,
            value: key
        })
    }

    return statesArray
}

export const stateCities = (state: string)  => {
    const states = StatesLgas
    const cities = states.find(st => st.stateSlug === slugify(state))
    return cities?.lgas ?? []
}

