/**
 * Fires the global custom event that opens the LeadTrialModal popup.
 * Import and call this from any CTA button instead of navigating to dos.namuste.com.
 *
 * Usage:
 *   import { openLeadModal } from "@/lib/openLeadModal";
 *   <button onClick={openLeadModal}>Claim Free Trial</button>
 */
export function openLeadModal(e?: React.MouseEvent | Event) {
  if (e) {
    e.preventDefault();
    e.stopPropagation();
  }
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("open-lead-modal"));
  }
}
