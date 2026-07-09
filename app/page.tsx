"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useState } from "react";
import BuyShares from "./BuyShares";

export default function Home() {
  const [selectedProperty, setSelectedProperty] = useState<{
    id: number;
    name: string;
    pricePerShare: number;
  } | null>(null);

const [openFaq, setOpenFaq] = useState<number | null>(null);

  const properties = [
    { name: "Victoria Island Tower", location: "Lagos, Nigeria", type: "Commercial", shares: "10,000", price: "$10", yield: "8.2%", sold: 65, color: "#0ea5e9", image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80" },
    { name: "Canary Wharf Office Suite", location: "London, UK", type: "Commercial", shares: "5,000", price: "$100", yield: "9.2%", sold: 40, color: "#38b6ff", image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&q=80" },
    { name: "Downtown Dubai Plaza", location: "Dubai, UAE", type: "Mixed", shares: "20,000", price: "$25", yield: "8.8%", sold: 80, color: "#7dd3fc", image: "https://images.unsplash.com/photo-1546412414-8035e1776c9a?w=600&q=80" },
    { name: "Ikoyi Luxury Apartments", location: "Lagos, Nigeria", type: "Residential", shares: "8,000", price: "$15", yield: "7.5%", sold: 55, color: "#0ea5e9", image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80" },
    { name: "Marina Bay Residences", location: "Singapore", type: "Residential", shares: "12,000", price: "$50", yield: "7.9%", sold: 30, color: "#38b6ff", image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=600&q=80" },
    { name: "Westlands Business Park", location: "Nairobi, Kenya", type: "Commercial", shares: "15,000", price: "$20", yield: "8.5%", sold: 70, color: "#7dd3fc", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80" },
  ];

  const faqs = [
    { q: "What is MIZU?", a: "MIZU is a decentralized real estate platform on Arc where ownership flows freely. Buy fractional shares of global properties and earn monthly rental yield in USDC. No banks. No borders." },
    { q: "How do I get started?", a: "Connect your crypto wallet, browse available properties, and buy shares using USDC. No bank account or paperwork required." },
    { q: "What is a fractional share?", a: "Instead of buying an entire property, you buy a small piece of it. If a property has 10,000 shares and you own 100, you own 1% of that property." },
    { q: "How do I earn yield?", a: "Property owners deposit monthly rental income into the MIZU smart contract. Your share of that rent is automatically calculated and available to claim in USDC anytime." },
    { q: "What is USDC?", a: "USDC is a stablecoin pegged 1:1 to the US dollar, issued by Circle. It is the currency used for all transactions on MIZU. Buying shares, paying fees, and receiving yield all happen in USDC." },
    { q: "What blockchain is MIZU built on?", a: "MIZU is built on Arc, Circle's Layer 1 blockchain where USDC is the native gas token. Transactions are fast, cheap, and settled in dollars." },
    { q: "Can I sell my shares?", a: "Yes. Secondary market trading is coming in Phase 2. For now you can hold your shares and earn yield." },
    { q: "Is MIZU safe?", a: "MIZU smart contracts are deployed on Arc Testnet. This is a testnet product. Do not use real funds. Mainnet launch with full audits is coming soon." },
  ];

  return (
    <main className="min-h-screen text-white" style={{
      background: "linear-gradient(135deg, #0a0f1e 0%, #0d1f3c 40%, #0a2a4a 70%, #0e3a5c 100%)"
    }}>
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div style={{
          position: "absolute", width: "600px", height: "600px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(56,182,255,0.15) 0%, transparent 70%)",
          top: "-100px", left: "-100px", animation: "float 8s ease-in-out infinite"
        }} />
        <div style={{
          position: "absolute", width: "500px", height: "500px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(100,210,255,0.1) 0%, transparent 70%)",
          bottom: "100px", right: "-50px", animation: "float 10s ease-in-out infinite reverse"
        }} />
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-30px) scale(1.05); }
        }
      `}</style>

      <nav style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "20px 40px", borderBottom: "1px solid rgba(56,182,255,0.15)",
        backdropFilter: "blur(20px)", position: "sticky", top: 0, zIndex: 100,
        background: "rgba(10,15,30,0.7)"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
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
                <path d="M0,10 Q11,4 22,10 Q33,16 44,10 L44,12 L0,12 Z" fill="white" opacity="0.3"/>
              </svg>
            </div>
          </div>
          <h1 style={{
            fontSize: "24px", fontWeight: "800",
            background: "linear-gradient(90deg, #ffffff, #7dd3fc)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
          }}>MIZU</h1>
        </div>
       <div style={{ display: "flex", gap: "32px", alignItems: "center" }}>
          <a href="/" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none", fontSize: "14px" }}>Properties</a>
          <a href="/portfolio" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none", fontSize: "14px" }}>Portfolio</a>
          <a href="#how-it-works" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none", fontSize: "14px" }}>How it works</a>
        </div>
        <ConnectButton />
      </nav>

      <section style={{
        display: "flex", flexDirection: "column", alignItems: "center",
        justifyContent: "center", textAlign: "center", padding: "100px 20px 80px"
      }}>
        <div style={{
          display: "inline-block", background: "rgba(56,182,255,0.1)",
          border: "1px solid rgba(56,182,255,0.3)", borderRadius: "50px",
          padding: "6px 16px", fontSize: "12px", color: "#7dd3fc",
          letterSpacing: "2px", textTransform: "uppercase", marginBottom: "24px"
        }}>Powered by USDC on Arc</div>
        <h2 style={{
          fontSize: "64px", fontWeight: "800", lineHeight: "1.1",
          maxWidth: "800px", marginBottom: "24px",
          background: "linear-gradient(180deg, #ffffff 0%, #7dd3fc 100%)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
        }}>Own Real Estate.<br />Earn Rent in USDC.</h2>
        <p style={{
          color: "rgba(255,255,255,0.5)", maxWidth: "480px", lineHeight: "1.7",
          marginBottom: "40px", fontSize: "16px"
        }}>
          MIZU lets anyone buy fractional shares of global real estate and earn
          monthly rental yield. Ownership flows freely. No banks. No brokers. No borders.
        </p>
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center" }}>
          <button style={{
            background: "linear-gradient(135deg, #38b6ff, #0ea5e9)", border: "none",
            color: "white", padding: "14px 32px", borderRadius: "50px",
            fontSize: "15px", fontWeight: "600", cursor: "pointer",
            boxShadow: "0 0 30px rgba(56,182,255,0.5)"
          }}>Browse Properties</button>
          <button style={{
            background: "transparent", border: "1px solid rgba(56,182,255,0.3)",
            color: "white", padding: "14px 32px", borderRadius: "50px",
            fontSize: "15px", fontWeight: "600", cursor: "pointer"
          }}>Learn More</button>
        </div>
        <div style={{
          display: "flex", gap: "60px", marginTop: "80px", padding: "32px 60px",
          background: "rgba(56,182,255,0.05)", border: "1px solid rgba(56,182,255,0.15)",
          borderRadius: "20px", backdropFilter: "blur(10px)"
        }}>
          {[
            { label: "Total Properties", value: "24+" },
            { label: "USDC Distributed", value: "$1.2M" },
            { label: "Avg. Annual Yield", value: "8.5%" },
            { label: "Global Investors", value: "3,400+" },
          ].map((stat) => (
            <div key={stat.label} style={{ textAlign: "center" }}>
              <p style={{
                fontSize: "28px", fontWeight: "800",
                background: "linear-gradient(90deg, #ffffff, #7dd3fc)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
              }}>{stat.value}</p>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "13px", marginTop: "4px" }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </section>
     <section id="properties" style={{ padding: "20px 40px 80px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
          <h3 style={{ fontSize: "28px", fontWeight: "700" }}>Featured Properties</h3>
          <a href="#" style={{ color: "#38b6ff", fontSize: "14px", textDecoration: "none" }}>View all →</a>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
          {properties.map((property, i) => (
            <div key={i} style={{
              background: "rgba(255,255,255,0.03)", border: "1px solid rgba(56,182,255,0.15)",
              borderRadius: "20px", overflow: "hidden", cursor: "pointer"
            }}>
          <div style={{
                height: "180px",
                position: "relative",
                overflow: "hidden"
              }}>
                <img
                  src={property.image}
                  alt={property.name}
                  style={{
                    width: "100%", height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.3s ease"
                  }}
                />
                <div style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(to bottom, transparent 50%, rgba(10,15,30,0.8) 100%)"
                }} />
                <div style={{
                  position: "absolute", bottom: 0, left: 0, right: 0, height: "2px",
                  background: `linear-gradient(90deg, transparent, ${property.color}, transparent)`
                }} />
              </div>
              <div style={{ padding: "20px" }}>
                <span style={{ fontSize: "11px", color: "#38b6ff", textTransform: "uppercase", letterSpacing: "1px" }}>
                  {property.type}
                </span>
                <h4 style={{ fontSize: "17px", fontWeight: "700", margin: "6px 0 4px" }}>{property.name}</h4>
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "13px", marginBottom: "16px" }}>
                  📍 {property.location}
                </p>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
                  {[
                    { label: "Price/Share", value: property.price + " USDC" },
                    { label: "Shares", value: property.shares },
                    { label: "Yield", value: property.yield },
                  ].map((item) => (
                    <div key={item.label}>
                      <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)", marginBottom: "4px" }}>{item.label}</p>
                      <p style={{
                        fontSize: "14px", fontWeight: "700",
                        color: item.label === "Yield" ? "#4ade80" : "white"
                      }}>{item.value}</p>
                    </div>
                  ))}
                </div>
                <div style={{
                  height: "4px", background: "rgba(255,255,255,0.1)",
                  borderRadius: "4px", marginBottom: "8px", overflow: "hidden"
                }}>
                  <div style={{
                    height: "100%", width: `${property.sold}%`,
                    background: "linear-gradient(90deg, #38b6ff, #7dd3fc)", borderRadius: "4px"
                  }} />
                </div>
                <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)", marginBottom: "16px" }}>
                  {property.sold}% shares sold
                </p>
                <button
                  onClick={() => setSelectedProperty({
                    id: i,
                    name: property.name,
                    pricePerShare: parseInt(property.price.replace("$", ""))
                  })}
                  style={{
                    width: "100%", background: "linear-gradient(135deg, #38b6ff, #0ea5e9)",
                    border: "none", color: "white", padding: "12px", borderRadius: "50px",
                    fontSize: "14px", fontWeight: "600", cursor: "pointer",
                    boxShadow: "0 0 15px rgba(56,182,255,0.3)"
                  }}>Buy Shares</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: "20px 40px 80px", borderTop: "1px solid rgba(56,182,255,0.1)" }}>
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <p style={{
            fontSize: "12px", color: "#7dd3fc", letterSpacing: "2px",
            textTransform: "uppercase", marginBottom: "16px"
          }}>Simple Process</p>
          <h3 style={{ fontSize: "36px", fontWeight: "800" }}>How MIZU Works</h3>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "24px" }}>
          {[
            { step: "01", title: "Connect Wallet", desc: "Connect your crypto wallet to MIZU in one click. No signup, no email required.", icon: "👛" },
            { step: "02", title: "Browse Properties", desc: "Explore global real estate listings. Filter by location, type, and yield.", icon: "🏢" },
            { step: "03", title: "Buy Shares", desc: "Purchase fractional shares of any property using USDC. Start from $10.", icon: "💰" },
            { step: "04", title: "Earn Rent", desc: "Receive monthly rental yield in USDC directly to your wallet. Claim anytime.", icon: "📈" },
          ].map((item) => (
            <div key={item.step} style={{
              background: "rgba(56,182,255,0.03)",
              border: "1px solid rgba(56,182,255,0.15)",
              borderRadius: "20px", padding: "32px 24px", textAlign: "center"
            }}>
              <div style={{ fontSize: "36px", marginBottom: "16px" }}>{item.icon}</div>
              <p style={{ color: "#38b6ff", fontSize: "12px", fontWeight: "700", marginBottom: "8px" }}>
                STEP {item.step}
              </p>
              <h4 style={{ fontSize: "18px", fontWeight: "700", marginBottom: "12px" }}>{item.title}</h4>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "14px", lineHeight: "1.6" }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: "20px 40px 80px", borderTop: "1px solid rgba(56,182,255,0.1)" }}>
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <p style={{
            fontSize: "12px", color: "#7dd3fc", letterSpacing: "2px",
            textTransform: "uppercase", marginBottom: "16px"
          }}>Got Questions?</p>
          <h3 style={{ fontSize: "36px", fontWeight: "800" }}>Frequently Asked Questions</h3>
        </div>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          {faqs.map((faq, i) => (
            <div
              key={i}
              onClick={() => setOpenFaq(openFaq === i ? null : i)}
              style={{
                border: `1px solid ${openFaq === i ? "rgba(56,182,255,0.4)" : "rgba(56,182,255,0.15)"}`,
                borderRadius: "16px", padding: "24px",
                marginBottom: "12px",
                background: openFaq === i ? "rgba(56,182,255,0.08)" : "rgba(56,182,255,0.03)",
                cursor: "pointer", transition: "all 0.2s"
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h4 style={{ fontSize: "16px", fontWeight: "700", color: "white", margin: 0 }}>
                  {faq.q}
                </h4>
                <span style={{
                  color: "#38b6ff", fontSize: "20px", fontWeight: "300",
                  transition: "transform 0.2s",
                  transform: openFaq === i ? "rotate(45deg)" : "rotate(0deg)"
                }}>+</span>
              </div>
              {openFaq === i && (
                <p style={{
                  color: "rgba(255,255,255,0.5)", fontSize: "14px",
                  lineHeight: "1.7", marginTop: "16px", marginBottom: 0
                }}>
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      <section style={{
        margin: "0 40px 80px",
        background: "linear-gradient(135deg, rgba(56,182,255,0.1), rgba(14,165,233,0.05))",
        border: "1px solid rgba(56,182,255,0.2)",
        borderRadius: "24px", padding: "60px 40px", textAlign: "center"
      }}>
        <h3 style={{ fontSize: "36px", fontWeight: "800", marginBottom: "16px" }}>
          Ready to own real estate onchain?
        </h3>
        <p style={{ color: "rgba(255,255,255,0.5)", marginBottom: "32px", fontSize: "16px" }}>
          Join thousands of investors earning USDC yield from global properties.
        </p>
        <a href="#properties" style={{
  display: "inline-block",
  background: "linear-gradient(135deg, #38b6ff, #0ea5e9)",
  color: "white", padding: "16px 40px", borderRadius: "50px",
  fontSize: "16px", fontWeight: "700", cursor: "pointer",
  boxShadow: "0 0 40px rgba(56,182,255,0.5)",
  textDecoration: "none"
}}>Get Started</a>
      </section>

      <footer style={{
        borderTop: "1px solid rgba(56,182,255,0.1)",
        padding: "60px 40px 40px",
        background: "rgba(10,15,30,0.8)"
      }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: "40px", marginBottom: "40px" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
              <div style={{
                width: "36px", height: "36px", borderRadius: "8px",
                background: "white", display: "flex", alignItems: "center",
                justifyContent: "center", flexDirection: "column",
                overflow: "hidden", position: "relative"
              }}>
                <span style={{ fontSize: "16px", fontWeight: "900", color: "#0ea5e9", lineHeight: "1" }}>M</span>
                <div style={{
                  position: "absolute", bottom: 0, left: 0, right: 0,
                  height: "10px", background: "linear-gradient(135deg, #38b6ff, #0ea5e9)"
                }}>
                  <svg viewBox="0 0 36 10" style={{ width: "100%", height: "100%" }}>
                    <path d="M0,6 Q9,2 18,6 Q27,10 36,6 L36,10 L0,10 Z" fill="white" opacity="0.4"/>
                  </svg>
                </div>
              </div>
              <span style={{ fontSize: "20px", fontWeight: "800", color: "white" }}>MIZU</span>
            </div>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "14px", lineHeight: "1.7", maxWidth: "280px" }}>
              Real estate yield, onchain. No banks. No middlemen. Just USDC.
            </p>
            <div style={{ display: "flex", gap: "12px", marginTop: "20px" }}>
              <a href="https://x.com/mizuonchain" target="_blank" style={{
                width: "36px", height: "36px", borderRadius: "8px",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "white", textDecoration: "none", fontSize: "14px"
              }}>𝕏</a>
            </div>
          </div>
          <div>
            <h4 style={{ fontSize: "14px", fontWeight: "700", marginBottom: "16px", color: "rgba(255,255,255,0.6)" }}>
              PLATFORM
            </h4>
            {["Properties", "Portfolio", "How it works"].map((link) => (
              <a key={link} href="#" style={{
                display: "block", color: "rgba(255,255,255,0.4)", textDecoration: "none",
                fontSize: "14px", marginBottom: "10px"
              }}>{link}</a>
            ))}
          </div>
          <div>
            <h4 style={{ fontSize: "14px", fontWeight: "700", marginBottom: "16px", color: "rgba(255,255,255,0.6)" }}>
              LEGAL
            </h4>
            {["Terms of Service", "Privacy Policy", "Risk Disclaimer"].map((link) => (
              <a key={link} href="#" style={{
                display: "block", color: "rgba(255,255,255,0.4)", textDecoration: "none",
                fontSize: "14px", marginBottom: "10px"
              }}>{link}</a>
            ))}
          </div>
        </div>
        <div style={{
          borderTop: "1px solid rgba(255,255,255,0.05)",
          paddingTop: "24px", display: "flex", justifyContent: "space-between", alignItems: "center"
        }}>
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "13px" }}>
            © 2025 MIZU. All rights reserved. Not financial advice.
          </p>
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "13px" }}>
            Built on Arc · Powered by USDC
          </p>
        </div>
      </footer>

      {selectedProperty && (
        <BuyShares
          propertyId={selectedProperty.id}
          propertyName={selectedProperty.name}
          pricePerShare={selectedProperty.pricePerShare}
          onClose={() => setSelectedProperty(null)}
        />
      )}
    </main>
  );
}