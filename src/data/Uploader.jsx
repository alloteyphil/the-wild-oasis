import { useState } from "react";
import { isFuture, isPast, isToday } from "date-fns";
import { convexHttpClient } from "../services/convexClient.js";
import { api } from "../../convex/_generated/api";
import Button from "../ui/Button";
import { subtractDates } from "../utils/helpers";
import toast from "react-hot-toast";
import styled from "styled-components";

import { bookings } from "./data-bookings";
import { cabins } from "./data-cabins";
import { guests } from "./data-guests";

const UploaderContainer = styled.div`
  margin-top: 3.2rem;
  background-color: var(--color-indigo-100);
  padding: 2rem;
  border-radius: var(--border-radius-md);
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  border: 1px solid var(--color-indigo-200);

  h3 {
    color: var(--color-indigo-900);
    font-size: 1.8rem;
    margin-bottom: 0.8rem;
  }

  p {
    color: var(--color-indigo-700);
    font-size: 1.4rem;
  }
`;

async function deleteGuests() {
  try {
    await convexHttpClient.mutation(api.seed.deleteAllGuests);
  } catch (error) {
    console.log(error.message);
  }
}

async function deleteCabins() {
  try {
    await convexHttpClient.mutation(api.seed.deleteAllCabins);
  } catch (error) {
    console.log(error.message);
  }
}

async function deleteBookings() {
  try {
    await convexHttpClient.mutation(api.seed.deleteAllBookings);
  } catch (error) {
    console.log(error.message);
  }
}

async function createGuests() {
  try {
    await convexHttpClient.mutation(api.seed.createGuests, { guests });
    toast.success(`${guests.length} guests created`);
  } catch (error) {
    console.log(error.message);
    toast.error(`Failed to create guests: ${error.message}`);
  }
}

async function createCabins() {
  try {
    await convexHttpClient.mutation(api.seed.createCabins, { cabins });
    toast.success(`${cabins.length} cabins created`);
  } catch (error) {
    console.log(error.message);
    toast.error(`Failed to create cabins: ${error.message}`);
  }
}

async function createBookings() {
  try {
    // First get all guest and cabin IDs
    const allGuests = await convexHttpClient.query(api.guests.getAll);
    const allCabins = await convexHttpClient.query(api.cabins.getCabins);

    const allGuestIds = allGuests.map((guest) => guest._id);
    const allCabinIds = allCabins.map((cabin) => cabin._id);

    const finalBookings = bookings.map((booking) => {
      // Here relying on the order of cabins, as they don't have an ID yet
      const cabin = cabins.at(booking.cabinId - 1);
      const numNights = subtractDates(booking.endDate, booking.startDate);
      const cabinPrice = numNights * (cabin.regularPrice - cabin.discount);
      const extrasPrice = booking.hasBreakfast
        ? numNights * 15 * booking.numGuests
        : 0; // hardcoded breakfast price
      const totalPrice = cabinPrice + extrasPrice;

      let status;
      if (
        isPast(new Date(booking.endDate)) &&
        !isToday(new Date(booking.endDate))
      )
        status = "checked-out";
      if (
        isFuture(new Date(booking.startDate)) ||
        isToday(new Date(booking.startDate))
      )
        status = "unconfirmed";
      if (
        (isFuture(new Date(booking.endDate)) ||
          isToday(new Date(booking.endDate))) &&
        isPast(new Date(booking.startDate)) &&
        !isToday(new Date(booking.startDate))
      )
        status = "checked-in";

      return {
        ...booking,
        numNights,
        cabinPrice,
        extrasPrice,
        totalPrice,
        guestId: allGuestIds.at(booking.guestId - 1),
        cabinId: allCabinIds.at(booking.cabinId - 1),
        status,
      };
    });

    console.log(finalBookings);

    await convexHttpClient.mutation(api.seed.createBookings, {
      bookings: finalBookings,
    });
  } catch (error) {
    console.log(error.message);
  }
}

function Uploader() {
  const [isLoading, setIsLoading] = useState(false);

  async function uploadAll() {
    setIsLoading(true);
    try {
      toast.loading("Deleting existing data...", { id: "upload" });
      // Bookings need to be deleted FIRST
      await deleteBookings();
      await deleteGuests();
      await deleteCabins();

      toast.loading("Creating guests...", { id: "upload" });
      await createGuests();

      toast.loading("Creating cabins...", { id: "upload" });
      await createCabins();

      toast.loading("Creating bookings...", { id: "upload" });
      await createBookings();

      toast.success("All sample data uploaded successfully!", { id: "upload" });
    } catch (error) {
      toast.error(`Failed to upload data: ${error.message}`, { id: "upload" });
    } finally {
      setIsLoading(false);
    }
  }

  async function uploadBookings() {
    setIsLoading(true);
    try {
      toast.loading("Updating bookings...", { id: "bookings" });
      await deleteBookings();
      await createBookings();
      toast.success("Bookings updated successfully!", { id: "bookings" });
    } catch (error) {
      toast.error(`Failed to update bookings: ${error.message}`, {
        id: "bookings",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <UploaderContainer>
      <h3>Sample Data</h3>
      <p>
        Upload sample data to populate the app with cabins, guests, and
        bookings. This will replace all existing data.
      </p>
      <div
        style={{
          display: "flex",
          gap: "1.2rem",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <Button onClick={uploadAll} disabled={isLoading} size="large">
          {isLoading ? "Uploading..." : "Upload All Data"}
        </Button>
        <Button
          onClick={uploadBookings}
          disabled={isLoading}
          variation="secondary"
          size="large"
        >
          {isLoading ? "Updating..." : "Update Bookings Only"}
        </Button>
      </div>
    </UploaderContainer>
  );
}

export default Uploader;
