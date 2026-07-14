"use client";

import { useState } from "react";
import { useWriteContract, useWaitForTransactionReceipt, useAccount } from "wagmi";
import { MIZU_CONTRACT_ADDRESS, MIZU_ABI, USDC_ADDRESS, USDC_ABI } from "./contract";

interface BuySharesProps {
  propertyId: number;
  propertyName: string;
  pricePerShare: number;
  onClose: () => void;
}

export default function BuyShares({ propertyId, propertyName, pricePerShare, onClose }: BuySharesProps) {
  const [shares, setShares] = useState(1);
  const [step, setStep] = useState<"approve" | "buy" | "done">("approve");
  const { address } = useAccount();

  const totalCost = shares * pricePerShare;

  const { writeContract: approve, data: approveHash } = useWriteContract();
  const { writeContract: buyShares, data: buyHash } = useWriteContract();

  const { isLoading: approving, isSuccess: approved } = useWaitForTransactionReceipt({ hash: approveHash });
  const { isLoading: buying, isSuccess: bought } = useWaitForTransactionReceipt({ hash: buyHash });

  const handleApprove = () => {
    approve({
      address: USDC_ADDRESS,
      abi: USDC_ABI,
      functionName: "approve",
      args: [MIZU_CONTRACT_ADDRESS, BigInt(999999 * 1_000_000)],
    });
  };

  const handleBuy = () => {
    buyShares({
      address: MIZU_CONTRACT_ADDRESS,
      abi: MIZU_ABI,
      functionName: "buyShares",
      args: [BigInt(propertyId), BigInt(shares)],
    });
  };

  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)",
      display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000
    }}>
      <div style={{
        background: "linear-gradient(135deg, #0d1f3c, #0a2a4a)",
        border: "1px solid rgba(56,182,255,0.3)",
        borderRadius: "24px", padding: "32px", width: "400px",
        boxShadow: "0 0 40px rgba(56,182,255,0.2)"
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
          <h3 style={{ fontSize: "20px", fontWeight: "700" }}>Buy Shares</h3>
          <button onClick={onClose} style={{
            background: "transparent", border: "none", color: "white",
            fontSize: "20px", cursor: "pointer"
          }}>✕</button>
        </div>

        <p style={{ color: "rgba(255,255,255,0.5)", marginBottom: "24px", fontSize: "14px" }}>
          {propertyName}
        </p>

        <div style={{ marginBottom: "24px" }}>
          <label style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)", display: "block", marginBottom: "8px" }}>
            Number of Shares
          </label>
          <input
            type="number"
            min="1"
            value={shares}
            onChange={(e) => setShares(Number(e.target.value))}
            style={{
              width: "100%", padding: "12px 16px",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(56,182,255,0.2)",
              borderRadius: "12px", color: "white",
              fontSize: "16px", outline: "none",
              boxSizing: "border-box"
            }}
          />
        </div>

        <div style={{
          background: "rgba(56,182,255,0.05)",
          border: "1px solid rgba(56,182,255,0.15)",
          borderRadius: "12px", padding: "16px", marginBottom: "24px"
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
            <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "13px" }}>Price per share</span>
            <span style={{ fontSize: "13px" }}>${pricePerShare} USDC</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "13px" }}>Total cost</span>
            <span style={{ fontSize: "16px", fontWeight: "700", color: "#38b6ff" }}>${totalCost} USDC</span>
          </div>
        </div>

        {bought ? (
          <div style={{ textAlign: "center", padding: "16px" }}>
            <p style={{ fontSize: "24px", marginBottom: "8px" }}>🎉</p>
            <p style={{ color: "#4ade80", fontWeight: "700" }}>Shares purchased successfully!</p>
          </div>
        ) : approved ? (
          <button
            onClick={handleBuy}
            disabled={buying}
            style={{
              width: "100%", background: "linear-gradient(135deg, #38b6ff, #0ea5e9)",
              border: "none", color: "white", padding: "14px",
              borderRadius: "50px", fontSize: "15px", fontWeight: "600",
              cursor: buying ? "not-allowed" : "pointer",
              opacity: buying ? 0.7 : 1
            }}
          >
            {buying ? "Buying..." : `Buy ${shares} Share${shares > 1 ? "s" : ""}`}
          </button>
        ) : (
          <button
            onClick={handleApprove}
            disabled={approving}
            style={{
              width: "100%", background: "linear-gradient(135deg, #38b6ff, #0ea5e9)",
              border: "none", color: "white", padding: "14px",
              borderRadius: "50px", fontSize: "15px", fontWeight: "600",
              cursor: approving ? "not-allowed" : "pointer",
              opacity: approving ? 0.7 : 1
            }}
          >
            {approving ? "Approving USDC..." : `Approve ${totalCost} USDC`}
          </button>
        )}

        <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "12px", textAlign: "center", marginTop: "16px" }}>
          Step 1: Approve USDC → Step 2: Buy Shares
        </p>
      </div>
    </div>
  );
}