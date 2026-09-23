import { describe, it, expect } from "vitest";
import { isBookingGenuinelyComplete } from "@/lib/bookingGuard";
import { INDUSTRY_FLOWS } from "@/data/industryFlows";

const NOW = new Date("2026-09-22T10:00:00+05:30"); // a Tuesday in IST
const clinic = INDUSTRY_FLOWS["doctors-clinics"];
const lawyers = INDUSTRY_FLOWS["lawyers"];

describe("isBookingGenuinelyComplete", () => {
  it("rejects when DOB is required but missing", () => {
    const complete = isBookingGenuinelyComplete(
      clinic, "doctors-clinics",
      { name: "Ankush", mobile: "9876543210", dob: "", department: "Orthopedics", slot: "Thursday, 25 September 2026, 11:00 am" },
      NOW
    );
    expect(complete).toBe(false);
  });

  it("accepts a fully genuine in-hours booking", () => {
    const complete = isBookingGenuinelyComplete(
      clinic, "doctors-clinics",
      { name: "Ankush", mobile: "9876543210", dob: "28", department: "Orthopedics", slot: "Thursday, 25 September 2026, 11:00 am" },
      NOW
    );
    expect(complete).toBe(true);
  });

  it("rejects a slot outside the department's operating hours", () => {
    const complete = isBookingGenuinelyComplete(
      clinic, "doctors-clinics",
      { name: "Ankush", mobile: "9876543210", dob: "28", department: "Orthopedics", slot: "Thursday, 25 September 2026, 7:00 pm" },
      NOW
    );
    expect(complete).toBe(false);
  });

  it("rejects an invalid mobile number even if every other field looks filled", () => {
    const complete = isBookingGenuinelyComplete(
      clinic, "doctors-clinics",
      { name: "Ankush", mobile: "123456", dob: "28", department: "Orthopedics", slot: "Thursday, 25 September 2026, 11:00 am" },
      NOW
    );
    expect(complete).toBe(false);
  });

  it("does not require DOB for an industry where requiresDob is false", () => {
    expect(lawyers.requiresDob).toBe(false);
    const complete = isBookingGenuinelyComplete(
      lawyers, "lawyers",
      { name: "Priya", mobile: "9876543210", dob: "", department: "Corporate Law", slot: "Friday, 26 September 2026, 3:00 pm" },
      NOW
    );
    expect(complete).toBe(true);
  });
});
