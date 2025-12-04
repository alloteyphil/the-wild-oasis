import { convexHttpClient } from "./convexClient.js";
import { api } from "../../convex/_generated/api";
import { getToday } from "../utils/helpers";
import { transformConvexDoc } from "./convexHelpers.js";

export async function getBookings({ filter, sortBy, page }) {
  const result = await convexHttpClient.query(api.bookings.getBookings, {
    filter: filter || undefined,
    sortBy: sortBy || undefined,
    page: page || undefined,
    });
  if (result && result.data) {
    return {
      ...result,
      data: transformConvexDoc(result.data),
    };
  }
  return result;
}

export async function getBooking(id) {
  const result = await convexHttpClient.query(api.bookings.getBooking, {
    id,
  });
  return transformConvexDoc(result);
}

export async function getBookingsAfterDate(date) {
  const result = await convexHttpClient.query(api.bookings.getBookingsAfterDate, {
    date,
  });
  return transformConvexDoc(result);
}

export async function getStaysAfterDate(date) {
  const result = await convexHttpClient.query(api.bookings.getStaysAfterDate, {
    date,
  });
  return transformConvexDoc(result);
}

export async function getStaysTodayActivity() {
  const today = getToday();
  const result = await convexHttpClient.query(api.bookings.getStaysTodayActivity, {
    today,
  });
  return transformConvexDoc(result);
}

export async function updateBooking(id, obj) {
  const result = await convexHttpClient.mutation(api.bookings.updateBooking, {
    id,
    updates: obj,
  });
  return transformConvexDoc(result);
}

export async function deleteBooking(id) {
  await convexHttpClient.mutation(api.bookings.deleteBooking, {
    id,
  });
}
