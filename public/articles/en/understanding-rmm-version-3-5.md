---
title: "Understanding RMM version 3.5"
date: "2026-05-13"
description: "Following the RIP00040 vote, RMM version 3.5 is live and the roadmap unfolds in three stages over time so the protocol can evolve step by step."
tags: ["rmm", "defi", "reusd", "governance"]
author: "Realtoken DAO Team"
imageHeader: "rmm-v3-5-blog.png"
---

# Understanding RMM version 3.5

This article **summarizes** the [proposal on the RealToken forum](https://forum.realtoken.community/d/122) and the **[RIP00040] Launch of RMM Version 3.5 Development** vote (mid-March 2026). It is **not** a substitute for the full proposal text.

## Context: why it matters now

**Indicative timeline**: from **16 January 2026**, debate on the RMM **liquidity crisis**; **5 March 2026**, publication of the v3.5 proposal; **17–18 March 2026**, vote on **starting development** (a technical mandate—not binding deployment parameters yet).

**RMM v3 situation** (as framed in the debate): utilization near **100%**, stablecoin borrow rates **above 30%** APR, roughly **$14.4M borrowed** vs **~$48M TVL**, **depositors unable** to withdraw stablecoins. The DAO earns a **share of borrow interest** (protocol parameter), but saturation hurts borrowers, depositors, and growth.

**RIP00040 question**: whether **RealT should develop** new **optional** features aimed at easing RMM **over-use**, described in the **proposal on the forum** and rolled out **in phases**. The vote **green-lights development**; it **does not set** deployment numbers—those require **separate DAO votes** (participation rate, REG / dREUSD ratio, DAO envelope, caps, durations, stablecoin rate path, etc.).

**Budget**: per the proposal, **no community cost** for this line item—**RealT** funds the related development.

## One-liner: what is RMM v3.5?

An **optional add-on** to **unchanged RMM Core v3**: a new **REUSD pool**, a **REUSD Manager** for debt migration and caps, and **three stages** from **incentivized migration** to **full RMM v3.5**, while advancing **REUSD phase 2** and mechanics for **RMM v4**.

## Motivation

- **Immediate**: address RMM **over-use** (100%, 30%+).
- **Short term**: kick off **REUSD phase 2** via **incentivized migration** (stage 1).
- **Medium term**: prepare **RMM v4** infrastructure.
- **Long term**: grow **DAO revenue** on REUSD borrowing (the proposal uses an illustrative **~10×** multiple on the same interest volume because the DAO would capture a far larger share on REUSD debt than on classic external-supplier stablecoin pools—see the full economics section in the proposal).
- **Design themes**: optional, **progressive** (3 stages), **incentives**, **REG utility**, **modular votes**, **resilient open-source** architecture.

## REUSD is not “just another stablecoin”

**REUSD** is an ecosystem **debt instrument**, not a generic stablecoin. On RMM, roles differ: stablecoins **deposit & borrow**; RealTokens as **collateral**; REUSD **borrow-only** in the sense described in the proposal—not the same UX as parking USDC liquidity—see the proposal’s role table.

**Temporal meaning of “REUSD”** (per proposal terminology):

- **Stage 1**: mainly **debt** from DAO-backed participation (**dREUSD**); **no** mint of transferable REUSD like today’s circulating token for this mechanism.
- **Stage 2**: **debt** plus existing **REUSD** in circulation; no new broad emissions as in stage 1 framing.
- **Stage 3**: term can cover **token** and **debt**; new **dREUSD** behaves like other RMM debt accounting (parallel to USDC / xDAI debt tokens).

## The three RMM v3.5 stages

**Stage 1**, incentivized migration, lets users repay stablecoins through an optional Manager path: a DAO-funded top-up at a voted participation rate, **0% dREUSD** for that phase, and **REG locks** to set caps. It bridges REUSD from **phase 1** toward **phase 2**.

**Stage 2** focuses on liquidity and stabilization: pools, arbitrage, a target peg near **1 REUSD ≈ 1 USD**, **voted** interest on dREUSD, and **REUSD-denominated repayment** when ready. This is **active REUSD phase 2**.

**Stage 3** is full RMM v3.5: **direct REUSD borrowing**, minting for new use cases, and deeper markets once **REUSD phase 2** is mature.

If stages 1 and 2 succeed, stage 3 is described as the **natural** continuation.

## Stage 1: user-facing mechanics

- **Option A**: **classic** RMM v3 repayment (unchanged).
- **Option B**: via **REUSD Manager**—stablecoin repayment with a **DAO participation** top-up at a **voted participation rate** (e.g. at 10%, $100 repaid can unwind ~$110 gross debt with ~$10 as 0% dREUSD—examples in the proposal).

**Four cumulative caps** (all must be satisfied): existing stablecoin debt; **locked REG** × **REG / dREUSD ratio** (e.g. indicative **1 REG = 2 dREUSD** headroom—subject to vote); **per-user cap**; **global DAO envelope**. Treasury can use **armm** positions; the Manager can bundle **repay + swap** in **one transaction** to reduce immediate liquidity sniping.

**dREUSD** remains **collateral-backed** like stablecoin debt (health factor, liquidations).

**Stablecoin rates**: **separate but coordinated** votes—possible **temporary 0%** then **stepped increases** so users can decide calmly (trade-off: **lower depositor yield** during the 0% window).

**Leaving stage 1** (cumulative DAO conditions): stabilized demand, stabilized envelope, utilization **back below 100%**, stablecoin rates **restored** as agreed. Indicative duration: **several months**, often **3–6+** months mentioned.

## Governance: modular votes

Recommended flow: one vote on **concept / dev mandate**, then **per-parameter votes**, then **recurring adjustments** (envelope, ratio vs REG price, stage transitions). Reduces “all-or-nothing” risk and enables **iteration**.

## Indicative roadmap

- **March 2026**: discussion + launch vote for v3.5.
- **April 2026**: if approved, RealT prepares **usage parameters**; DAO **votes** on them.
- **May 2026**: **stage 1 start** (if schedule holds).
- **2026–2027**: later stages per **voted durations**.

## Risks

The proposal flags e.g. borrower default / liquidation, sudden **REUSD → stablecoin** liquidity demand, **depeg**, and **governance** error—with mitigations (caps, reserves, stage-2 stabilization, education).

## Resources

- [Proposal on the forum (RMM v3.5)](https://forum.realtoken.community/d/122)
- [REUSD FAQ](https://faq.realt.co/en/article/what-is-the-reusd-1qotto0/)
- [Community REUSD tutorial](https://community-realt.gitbook.io/tuto-community/site-realt/bon-dachat-voucher-reusd)
- [RMM documentation](https://community-realt.gitbook.io/tuto-community/defi-realt/rmm)
