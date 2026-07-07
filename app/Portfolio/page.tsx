"use client";

import { useAccount, useReadContract } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useState } from "react";
import { MIZU_CONTRACT_ADDRESS, MIZU_ABI } from "../contract";
import Link from "next/link";

const properties = [
  { name: "Victoria Island Tower", location: "Lagos, Nigeria", type: "Commercial", price: "$10" },
  { name: "Canary Wharf Office Suite", location: "London, UK", type: "Commercial", price: "$100" },
  { name: "Downtown Dubai Plaza", location: "Dubai, UAE", type: "Mixed", price: "$25" },
  { name: "Ikoyi Luxury Apartments", location: "Lagos, Nigeria", type: "Residential", price: "$15" },
  { name: "Marina Bay Residences", location: "Singapore", type: "Residential", price: "$50" },
  { name: "Westlands Business Park", location: "Nairobi, Kenya", type: "Commercial", price: "$20" },
];

function PropertyRow({ propertyId, address }: { propertyId: number; address: `0x${string}` }) {
  const { data: shares } = useReadContract({
    address: MIZU_CONTRACT_ADDRESS,
    abi: MIZU_ABI,
    functionName: "getMyShares",
    args: [BigInt(propertyId), address],
  });

  const { data: yield_ } = useReadContract({
    address: MIZU_CONTRACT_ADDRESS,
    abi: MIZU_ABI,
    functionName: "getMyYield",
    args: [BigInt(propertyId), address],
  });

  const sharesOwned = shares ? Number(shares) : 0;
  const yieldAmount = yield_ ? Number(yield_) / 1_000_000 : 0;

  if (sharesOwned === 0) return null;

  const property = properties[propertyId];

  return (
    <div style={{
      border: "1px solid rgba(56,182,255,0.15)",
      borderRadius: "16px", padding: "24px",
      marginBottom: "16px",
      background: "rgba(56,182,255,0.03)",
      display: "grid",
      gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr",
      alignItems: "center", gap: "16px"
    }}>
      <div>
        <h4 style={{ fontSize: "16px", fontWeight: "700", marginBottom: "4px" }}>{property.name}</h4>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "13px" }}>📍 {property.location}</p>
      </div>
      <div>
        <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", marginBottom: "4px" }}>Type</p>
        <p style={{ fontSize: "14px", color: "#38b6ff" }}>{property.type}</p>
      </div>
      <div>
        <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", marginBottom: "4px" }}>Shares Owned</p>
        <p style={{ fontSize: "14px", fontWeight: "700" }}>{sharesOwned}</p>
      </div>
      <div>
        <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", marginBottom: "4px" }}>Value</p>
        <p style={{ fontSize: "14px", fontWeight: "700" }}>${sharesOwned * parseInt(property.price.replace("$", ""))} USDC</p>
      </div>
      <div>
        <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", marginBottom: "4px" }}>Claimable Yield</p>
        <p style={{ fontSize: "14px", fontWeight: "700", color: "#4ade80" }}>${yieldAmount.toFixed(4)} USDC</p>
      </div>
    </div>
  );
}

export default function Portfolio() {
  const { address, isConnected } = useAccount();

  return (
    <main className="min-h-screen text-white" style={{
      background: "linear-gradient(135deg, #0a0f1e 0%, #0d1f3c 40%, #0a2a4a 70%, #0e3a5c 100%)"
    }}>
      <nav style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "20px 40px", borderBottom: "1px solid rgba(56,182,255,0.15)",
        backdropFilter: "blur(20px)", position: "sticky", top: 0, zIndex: 100,
        background: "rgba(10,15,30,0.7)"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{
              width: "44px", height: "44px", borderRadius: "10px",
              background: "white", display: "flex", alignItems: "center",
              justifyContent: "center", boxShadow: "0 0 20px rgba(56,182,255,0.5)",
              flexDirection: "column", overflow: "hidden", position: "relative"
            }}>
              <span style={{ fontSize: "20px", fontWeight: "900", color: "#0ea5e9", lineHeight: "1" }}>M</span>
              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0,
                height: "12px", background: "linear-gradient(135deg, #38b6ff, #0ea5e9)"
              }}>
                <svg viewBox="0 0 44 12" style={{ width: "100%", height: "100%" }}>
                  <path d="M0,8 Q11,2 22,8 Q33,14 44,8 L44,12 L0,12 Z" fill="white" opacity="0.4"/>
                </svg>
              </div>
            </div>
            <h1 style={{
              fontSize: "24px", fontWeight: "800",
              background: "linear-gradient(90deg, #ffffff, #7dd3fc)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
            }}>MIZU</h1>
          </Link>
        </div>
        <div style={{ display: "flex", gap: "32px", alignItems: "center" }}>
          {[["Properties", "/"], ["Portfolio", "/portfolio"], ["How it works", "/"]].map(([item, href]) => (
            <Link key={item} href={href} style={{
              color: item === "Portfolio" ? "#38b6ff" : "rgba(255,255,255,0.6)",
              textDecoration: "none", fontSize: "14px",
              fontWeight: item === "Portfolio" ? "700" : "400"
            }}>{item}</Link>
          ))}
        </div>
        <ConnectButton />
      </nav>

      <section style={{ padding: "60px 40px" }}>
        <div style={{ marginBottom: "40px" }}>
          <h2 style={{ fontSize: "36px", fontWeight: "800", marginBottom: "8px" }}>My Portfolio</h2>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "16px" }}>
            Your fractional real estate holdings on MIZU
          </p>
        </div>

        {!isConnected ? (
          <div style={{
            textAlign: "center", padding: "80px 40px",
            border: "1px solid rgba(56,182,255,0.15)",
            borderRadius: "24px", background: "rgba(56,182,255,0.03)"
          }}>
            <p style={{ fontSize: "48px", marginBottom: "16px" }}>👛</p>
            <h3 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "12px" }}>Connect your wallet</h3>
            <p style={{ color: "rgba(255,255,255,0.4)", marginBottom: "32px" }}>
              Connect your wallet to view your MIZU portfolio
            </p>
            <ConnectButton />
          </div>
        ) : (
          <div>
            <div style={{
              display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
              gap: "24px", marginBottom: "40px"
            }}>
              {[
                { label: "Total Properties", value: "Loading..." },
                { label: "Total Value", value: "Loading..." },
                { label: "Claimable Yield", value: "Loading..." },
              ].map((stat) => (
                <div key={stat.label} style={{
                  border: "1px solid rgba(56,182,255,0.15)",
                  borderRadius: "16px", padding: "24px",
                  background: "rgba(56,182,255,0.03)"
                }}>
                  <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "13px", marginBottom: "8px" }}>{stat.label}</p>
                  <p style={{ fontSize: "24px", fontWeight: "800", color: "#38b6ff" }}>{stat.value}</p>
                </div>
              ))}
            </div>

            <h3 style={{ fontSize: "20px", fontWeight: "700", marginBottom: "24px" }}>Your Properties</h3>

            <div style={{
              display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr",
              padding: "0 24px", marginBottom: "12px", gap: "16px"
            }}>
              {["Property", "Type", "Shares", "Value", "Yield"].map((col) => (
                <p key={col} style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "1px" }}>{col}</p>
              ))}
            </div>

            {address && properties.map((_, i) => (
              <PropertyRow key={i} propertyId={i} address={address} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}