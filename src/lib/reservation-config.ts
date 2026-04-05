export const reservationTimeOptions = [
    { value: "09:00", label: "09:00 AM" },
    { value: "11:00", label: "11:00 AM" },
    { value: "13:00", label: "01:00 PM" },
    { value: "15:00", label: "03:00 PM" },
  ] as const;
  
  export const minGuestCount = 1;
  export const maxGuestCount = 6;
  
  export const guestCountOptions = Array.from(
    { length: maxGuestCount - minGuestCount + 1 },
    (_, index) => {
      const count = minGuestCount + index;
  
      return {
        value: String(count),
        label: `${count} guest${count === 1 ? "" : "s"}`,
      };
    },
  );
  