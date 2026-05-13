---
title: "Understanding RMM version 3.5"
date: "2026-05-13"
description: "After RIP00040 and RIP00043, the RMM v3.5 roadmap advances: principles, development, and first voted parameters for Phase 1."
tags: ["rmm", "defi", "reusd", "governance"]
author: "Realtoken DAO Team"
imageHeader: "rmm-v3-5-blog.png"
---

# Understanding RMM version 3.5

This article **summarizes** the [proposal on the RealToken forum](https://forum.realtoken.community/d/122) (overall RMM v3.5 design), the [**RIP00040**](https://www.tally.xyz/gov/realtoken-ecosystem-governance/proposal/1401729377552517862159119104352447734711165592875340838992095449427178715814) vote that approved the **principles** and **development launch**, and the [**RIP00043 — First parameters of RMM v3.5**](https://www.tally.xyz/gov/realtoken-ecosystem-governance/proposal/640910280800835192023262285687656568134775170449659841348595080639880745966) vote described in the [proposal on the forum (Phase 1 parameters)](https://forum.realtoken.community/d/127).

## Context: why it matters now

**Indicative timeline**:

- **16 January 2026**: debate on the RMM **liquidity crisis**.
- **5 March 2026**: publication of the v3.5 proposal.
- **17–18 March 2026**: [**RIP00040**](https://www.tally.xyz/gov/realtoken-ecosystem-governance/proposal/1401729377552517862159119104352447734711165592875340838992095449427178715814) vote on **starting development**.
- **From 28 March 2026**: forum discussion on parameters.
- **11 April 2026**: [**RIP00043**](https://www.tally.xyz/gov/realtoken-ecosystem-governance/proposal/640910280800835192023262285687656568134775170449659841348595080639880745966) vote opens on a first set of **Phase 1** parameters.

**RMM v3 situation** (as framed in the debate): utilization near **100%**, stablecoin borrow rates **above 30%** APR, roughly **$14.4M borrowed** vs **~$48M TVL**, **depositors unable** to withdraw stablecoins. The DAO earns a **share of borrow interest** (protocol parameter), but saturation hurts borrowers, depositors, and growth.

[**RIP00040**](https://www.tally.xyz/gov/realtoken-ecosystem-governance/proposal/1401729377552517862159119104352447734711165592875340838992095449427178715814): the community approved **RealT developing** **optional** features to ease RMM **over-use**, described in the **proposal on the forum**, rolled out **in phases**. That vote **green-lights development** and sets the **overall framework** for RMM v3.5.

## One-liner: what is RMM v3.5?

**RMM v3.5** is mainly an **option**: you can **move part of your** stablecoin **debt** (USDC, xDAI) into **REUSD** (**dREUSD**) if you want to, without replacing normal RMM behavior. **At first**, how much you can migrate per wallet is **capped low** (on the order of **$100** equivalent), then that **cap rises over time** so more participants can use the program. To qualify, you **lock REG** in the protocol’s **vault**: each locked REG unlocks up to **2 dREUSD** of migration headroom. In parallel, the **DAO** brings its **treasury** into the trade: it **matches your repayment dollar-for-dollar** (**100%** participation), as an **incentive** to shift debt into dREUSD instead of keeping it only in stablecoins.

## [RIP00043](https://www.tally.xyz/gov/realtoken-ecosystem-governance/proposal/640910280800835192023262285687656568134775170449659841348595080639880745966) vote: first Phase 1 parameters

After [**RIP00040**](https://www.tally.xyz/gov/realtoken-ecosystem-governance/proposal/1401729377552517862159119104352447734711165592875340838992095449427178715814), the DAO voted an **initial parameter set** for **Phase 1** of the RMM v3.5 rollout, detailed in the [proposal on the forum](https://forum.realtoken.community/d/127). Those settings can still be **changed** by **further DAO votes** depending on how the program performs.

### DAO budget (global envelope)

The DAO allocates up to **50%** of its treasury in **armmv3USDC** and **armmv3WXDAI** to the migration program. For reference, the proposal cites treasury holdings of about **116k** armmv3USDC and **97k** armmv3WXDAI; using half balances **scale** with **headroom** for other DAO work. The team also publishes the **mapping** to on-chain caps (e.g. **GlobalMintCap**-style limits, with illustrative figures on the order of **57,865** armmUSDC and **48,330** armmXDAI at proposal drafting time) for technical readers.

### 100% participation rate

The DAO **participation rate** is **100%**: for every **$100** the borrower repays in stablecoins through the mechanism, the DAO adds **another $100** to fund migration of stablecoin debt into **dREUSD**. The stated goal is to **avoid** leftover stablecoin dust being **sniped by bots** instead of cleanly feeding migration.

### Per-wallet participation cap (stepped ramp)

The per-**wallet** cap starts at **100 REUSD** (equivalent), then **doubles every fifteen days** versus the prior period’s cap, up to a maximum of **1,600 REUSD** (a 100 → 200 → 400 → 800 → 1,600 pattern). Over roughly **two and a half months**, each borrower’s **individual cap** rises progressively—intended as a compromise between **attractiveness**, **fair access**, and **DAO budget** control.

### REG lock and dREUSD ratio

**REG** must be **locked**; each locked REG unlocks at most **2 dREUSD** of migration headroom (**2 dREUSD per REG**). If the **REG price** moves a lot, governance can **vote again** to adjust the cap.

### Minimum Phase 1 duration

**Minimum** Phase 1 length is **five months** from **launch**. During that phase the migration program stays active, the **dREUSD borrow rate is 0%**, and **USDC / xDAI rates** follow values **voted separately** (see **RIP00042** for stablecoin rates). **Loans stay locked** in Phase 1: only **repayments** are allowed.

### Why five months on the calendar

The proposal explains that after about **2.5 months** the per-wallet cap reaches its **maximum** (1,600 REUSD), then about **2.5 more months** can allow **stablecoin rates** to **rise again** and **lock in** migration benefits—hence the **five-month minimum** for Phase 1.

### What borrowers gain

In Phase 1, borrowers can **choose** DAO-assisted repayment: part of **stablecoin** debt shifts to **dREUSD** at **0%** for that phase, instead of staying entirely on variable-rate **stablecoins** (with the **rate ceiling** set in a **different vote**). The voted parameters aim for a **balance** between DAO resources, program **appeal**, and **broad access**; they also build on a **forum poll**.

## Motivation

- **Immediate**: address RMM **over-use**.
- **Short term**: kick off **REUSD phase 2** via **incentivized migration** (stage 1).
- **Medium term**: prepare **RMM v4** infrastructure.
- **Long term**: grow **DAO revenue** on REUSD borrowing (the proposal uses an illustrative **~10×** multiple on the same interest volume because the DAO would capture a far larger share on REUSD debt than on classic external-supplier stablecoin pools—see the full economics section in the proposal).
- **Design themes**: optional, **progressive** (3 stages), **incentives**, **REG utility**, **modular votes**.

## REUSD is not “just another stablecoin”

**REUSD** is an ecosystem **debt instrument**, not a generic stablecoin. On RMM, roles differ: stablecoins **deposit & borrow**; RealTokens as **collateral**; REUSD **borrow-only** in the sense described in the proposal—not the same UX as parking USDC liquidity—see the proposal’s role table.

**Temporal meaning of “REUSD”** (per proposal terminology):

- **Stage 1**: mainly **debt** from DAO-backed participation (**dREUSD**); **no** mint of transferable REUSD like today’s circulating token for this mechanism.
- **Stage 2**: **debt** plus existing **REUSD** in circulation; no new broad emissions as in stage 1 framing.
- **Stage 3**: term can cover **token** and **debt**; new **dREUSD** behaves like other RMM debt accounting (parallel to USDC / xDAI debt tokens).

## The three RMM v3.5 stages

**Stage 1**, incentivized migration, lets users repay stablecoins through an optional Manager path: a DAO-funded top-up at the **voted participation rate** (**100%** in the first Phase 1 package under [**RIP00043**](https://www.tally.xyz/gov/realtoken-ecosystem-governance/proposal/640910280800835192023262285687656568134775170449659841348595080639880745966)), **0% dREUSD** for that phase, and **REG locks** for caps. It bridges REUSD from **phase 1** toward **phase 2**.

**Stage 2** focuses on liquidity and stabilization: pools, arbitrage, a target peg near **1 REUSD ≈ 1 USD**, **voted** interest on dREUSD, and **REUSD-denominated repayment** when ready. This is **active REUSD phase 2**.

**Stage 3** is full RMM v3.5: **direct REUSD borrowing**, minting for new use cases, and deeper markets once **REUSD phase 2** is mature.

If stages 1 and 2 succeed, stage 3 is described as the **natural** continuation.

## Benefits of RMM v3.5

**Help repaying on the RMM.** The design aims to **make it easier** to pay down stablecoin debt through a **structured**, **incentivized** path—rather than leaving each borrower alone against high rates or stuck liquidity.

**Cheaper repayment thanks to the DAO treasury.** The DAO **puts treasury funds to work** (per voted parameters, e.g. **100%** participation in Phase 1), which can **lower the effective cost** of repayment for users who use the Manager route. There are also **secondary markets** where people sometimes **repay RMM exposure at a discount**, e.g. by buying **armm** below par; one tool to spot offers is [Scappa](https://scappa.battistu.com/). It is important to stress that such venues **usually do not offer deep liquidity** and are **not** a **sustainable** way to deleverage the whole ecosystem at scale—RMM v3.5 instead targets a **lasting**, governance-led framework.

**Seeing who repays.** On-chain flows and the migration program make it easier to **identify** users who **actively repay**, which supports **monitoring**, **communication**, and **parameter updates** by the DAO.

**Preparing the ecosystem for what comes next.** v3.5 **lays groundwork** for **later projects**, especially **RMM v4** and **support for additional currencies** or markets, by proving debt, treasury, and iterative voting mechanics in production.

**More DAO revenue on REUSD.** As **REUSD** / **dREUSD** debt grows and accrues interest under voted terms, the DAO can **capture a larger share of interest** on that leg than on classic stablecoin pools (see the original proposal economics, on the order of **~10×** on the same illustrative interest volume).

## Step by step: How to migrate your debt

### 1. Open the Dashboard

Go to the **Dashboard** tab on [rmm.realtoken.network](https://rmm.realtoken.network/). A new **“REUSD program”** panel appears.

The panel shows:

- Your available REUSD debt quota (decreases as you convert)
- Your REG balance in the wallet (available to lock)
- REG already locked in the program
- A **Convert stablecoin debt** button
- A **Withdraw REG** button *(inactive in Phase 1)*

### 2. Set up your conversion

Click **Convert stablecoin debt** and fill in:

- **Asset** — the stablecoin for your loan (e.g. USDC, xDAI)
- **Repayment amount** — the total including the DAO top-up

The UI shows a breakdown of what will be taken from your wallet:

<table>
<thead>
<tr><th>Item</th><th>Amount</th></tr>
</thead>
<tbody>
<tr><td>Stablecoins taken from your wallet</td><td>Total ÷ 2</td></tr>
<tr><td>REG locked</td><td>Stablecoins repaid ÷ 2</td></tr>
<tr><td>DAO contribution (stablecoin)</td><td>Total ÷ 2</td></tr>
</tbody>
</table>

> If a limit is hit (quota, budget, REG balance), an explanatory message appears in the interface.

### 3. Approve and execute

Approve REG and stablecoin spending from your wallet, then confirm the transaction.

## For technical readers

### REUSDPoolManager smart contract

The core of the program is the `REUSDPoolManager` contract, deployed on Gnosis Chain:

[0x371a02f425cfa011969085ff6ec4f8e53bd77360](https://gnosisscan.io/address/0x371a02f425cfa011969085ff6ec4f8e53bd77360)

Four main functions, each active depending on the phase:

<table>
<thead>
<tr><th>Function</th><th>Description</th><th>Active phases</th></tr>
</thead>
<tbody>
<tr><td><code>repayDebtWithStable</code></td><td>Repay stablecoin debt with DAO subsidy + REG lock</td><td>1 &amp; 2</td></tr>
<tr><td><code>repayReusdWithStable</code></td><td>Repay dREUSD (in stablecoin or REUSD) + proportional REG unlock</td><td>2 &amp; 3</td></tr>
<tr><td><code>borrowReusd</code></td><td>Borrow REUSD against collateral</td><td>Phase 3 only</td></tr>
<tr><td><code>withdrawReg</code></td><td>Withdraw locked REG</td><td>1, 2 &amp; 3</td></tr>
</tbody>
</table>

### REUSD reserve and related tokens

<table>
<thead>
<tr><th>Token</th><th>Address</th><th>Notes</th></tr>
</thead>
<tbody>
<tr><td><strong>REUSD reserve</strong></td><td><a href="https://gnosisscan.io/address/0x3390742Ac0DCe14EA6Fcbd5Ae02e2303C5D62Ad9" target="_blank" rel="noopener noreferrer"><code>0x3390742Ac0DCe14EA6Fcbd5Ae02e2303C5D62Ad9</code></a></td><td>Main reserve</td></tr>
<tr><td><strong>aToken REUSD</strong> (deposit)</td><td><a href="https://gnosisscan.io/address/0xd04C3b20F08B1D51F7429b2205491183A7b3583F" target="_blank" rel="noopener noreferrer"><code>0xd04C3b20F08B1D51F7429b2205491183A7b3583F</code></a></td><td>Deposits and withdrawals blocked</td></tr>
<tr><td><strong>variableDebtToken</strong> (dREUSD)</td><td><a href="https://gnosisscan.io/address/0x00EDDAE5C334bfe4E929c775Aaa7aee1A116E077" target="_blank" rel="noopener noreferrer"><code>0x00EDDAE5C334bfe4E929c775Aaa7aee1A116E077</code></a></td><td>Mint reserved to REUSDManager; active burn for repayment and liquidation</td></tr>
<tr><td><strong>stableDebtToken</strong></td><td><a href="https://gnosisscan.io/address/0xF4c85940709aF241316D806b7B07729e9de31071" target="_blank" rel="noopener noreferrer"><code>0xF4c85940709aF241316D806b7B07729e9de31071</code></a></td><td>Disabled</td></tr>
<tr><td><strong>InterestRate contract</strong></td><td><a href="https://gnosisscan.io/address/0x134340085739211A56fC467092058c79B3475F8B" target="_blank" rel="noopener noreferrer"><code>0x134340085739211A56fC467092058c79B3475F8B</code></a></td><td>Initialized at 0%</td></tr>
</tbody>
</table>

## Resources

- [**RIP00040** on Tally](https://www.tally.xyz/gov/realtoken-ecosystem-governance/proposal/1401729377552517862159119104352447734711165592875340838992095449427178715814)
- [**RIP00043** on Tally](https://www.tally.xyz/gov/realtoken-ecosystem-governance/proposal/640910280800835192023262285687656568134775170449659841348595080639880745966)
- [Proposal on the forum (RMM v3.5 framework)](https://forum.realtoken.community/d/122)
- [Proposal on the forum (Phase 1 parameters, RIP00043)](https://forum.realtoken.community/d/127)
- [REUSD FAQ](https://faq.realt.co/en/article/what-is-the-reusd-1qotto0/)
- [Community REUSD tutorial](https://community-realt.gitbook.io/tuto-community/site-realt/bon-dachat-voucher-reusd)
- [RMM documentation](https://community-realt.gitbook.io/tuto-community/defi-realt/rmm)
