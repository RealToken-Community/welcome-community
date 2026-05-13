---
title: "Comprendre la version 3.5 du RMM"
date: "2026-05-13"
description: "Suite aux votes RIP00040 et RIP00043, la feuille de route RMM v3.5 avance : principes, développement et premiers paramètres votés pour la phase 1."
tags: ["rmm", "defi", "reusd", "gouvernance"]
author: "Equipe Realtoken DAO"
imageHeader: "rmm-v3-5-blog.png"
---

# Comprendre la version 3.5 du RMM

Cet article **condense** la [proposition sur le forum RealToken](https://forum.realtoken.community/d/122) (cadre général du RMM v3.5), le vote [**RIP00040**](https://www.tally.xyz/gov/realtoken-ecosystem-governance/proposal/1401729377552517862159119104352447734711165592875340838992095449427178715814) qui a validé les **principes** et le **lancement du développement**, puis le vote [**RIP00043 — First parameters of RMM v3.5**](https://www.tally.xyz/gov/realtoken-ecosystem-governance/proposal/640910280800835192023262285687656568134775170449659841348595080639880745966) exposé dans la [proposition sur le forum (paramètres phase 1)](https://forum.realtoken.community/d/127).

## Contexte : pourquoi en parler maintenant ?

**Chronologie indicative** :

- **16 janvier 2026** : débat sur la **crise de liquidité** du RMM.
- **5 mars 2026** : publication de la proposition v3.5.
- **17–18 mars 2026** : vote [**RIP00040**](https://www.tally.xyz/gov/realtoken-ecosystem-governance/proposal/1401729377552517862159119104352447734711165592875340838992095449427178715814) sur le lancement du développement.
- **Depuis le 28 mars 2026** : discussions sur le forum autour des paramètres.
- **11 avril 2026** : ouverture du vote [**RIP00043**](https://www.tally.xyz/gov/realtoken-ecosystem-governance/proposal/640910280800835192023262285687656568134775170449659841348595080639880745966) sur une première mouture des paramètres de **phase 1**.

**Situation du RMM v3** (à la date des débats) : utilisation **~100 %**, taux d’emprunt en stablecoins **supérieurs à 30 %** annuel, ordre de grandeur **~14,4 M$ empruntés** pour **~48 M$ de TVL**, **déposants bloqués** sur les retraits en stablecoins. La DAO capte une **part des intérêts** sur les emprunts (paramètre de protocole), mais la saturation pénalise emprunteurs, déposants et croissance.

**Objet du vote** [**RIP00040**](https://www.tally.xyz/gov/realtoken-ecosystem-governance/proposal/1401729377552517862159119104352447734711165592875340838992095449427178715814) : la communauté a validé le principe que **RealT développe** des **fonctionnalités optionnelles** pour **réduire la surutilisation** du RMM, décrites dans la **proposition sur le forum**, avec **mise en œuvre par phases**. Ce vote **autorise le développement** ; il pose le **cadre** du RMM v3.5.

## En une phrase : qu’est-ce que le RMM v3.5 ?

Le **RMM v3.5**, c’est d’abord une **option** : vous pouvez **déplacer une partie de votre dette** en stablecoins (USDC, xDAI) vers une dette en **REUSD** (**dREUSD**), si vous le souhaitez, sans remplacer le fonctionnement habituel du RMM. Au **début**, le montant migrable par portefeuille est **plafonné bas** (autour de **100 dollars** d’équivalent), puis ce **plafond monte dans le temps** pour laisser plus de place à ceux qui participent au programme. Pour en bénéficier, il faut **verrouiller des REG** dans un **coffre-fort** prévu par le protocole : chaque REG verrouillé ouvre jusqu’à **2 dREUSD** de capacité de migration. En parallèle, la **DAO** met sa **trésorerie** dans la balance : elle **double l’effet** de votre remboursement (**100 %** de participation), comme une **incitation** à migrer la dette vers la dREUSD plutôt que de la laisser uniquement en stablecoins.

## Vote [RIP00043](https://www.tally.xyz/gov/realtoken-ecosystem-governance/proposal/640910280800835192023262285687656568134775170449659841348595080639880745966) : premiers paramètres pour la phase 1

Après le [**RIP00040**](https://www.tally.xyz/gov/realtoken-ecosystem-governance/proposal/1401729377552517862159119104352447734711165592875340838992095449427178715814), la DAO a voté une **première version** des paramètres applicables à la **phase 1** du déploiement du RMM v3.5, détaillée sur la [proposition sur le forum](https://forum.realtoken.community/d/127).

Les paramètres de phase 1 ont été votés par la DAO. Ils pourront être ajustés par de futurs votes selon l’avancement du programme.

<table>
<thead>
<tr><th>Paramètre</th><th>Valeur</th><th>Description</th></tr>
</thead>
<tbody>
<tr><td><strong>GlobalMintCap</strong></td><td>~57&nbsp;865 armmUSDC / ~48&nbsp;330 armmXDAI</td><td>Plafond de dREUSD mintable — ~50&nbsp;% de la trésorerie DAO par stablecoin</td></tr>
<tr><td><strong>reusdFactor</strong></td><td>50&nbsp;%</td><td>Taux d’abondement DAO — match à 1:1</td></tr>
<tr><td><strong>regFactor</strong></td><td>50&nbsp;%</td><td>Taux de blocage REG — 50 REG pour 100&nbsp;$ convertis</td></tr>
<tr><td><strong>userMintCap</strong></td><td>100 → 1&nbsp;600 REUSD</td><td>Plafond par wallet, doublement toutes les 15 jours sur ~2,5 mois</td></tr>
<tr><td><strong>Durée phases 1+2</strong></td><td>Minimum 5 mois</td><td>Fenêtre de migration active depuis le lancement</td></tr>
</tbody>
</table>

### Budget alloué par la DAO (enveloppe globale)

La DAO consacre jusqu’à **50 %** de sa trésorerie en **armmv3USDC** et **armmv3WXDAI** au programme de migration. À titre indicatif, la proposition mentionne une trésorerie d’environ **116 k** armmv3USDC et **97 k** armmv3WXDAI ; mobiliser la moitié allie **ampleur du dispositif** et **réserve** pour d’autres actions de la DAO. Les équipes publient en parallèle la **traduction** de ces choix en paramètres de contrat (par exemple des plafonds d’émission globaux du type **GlobalMintCap**, avec des ordres de grandeur du type **57 865** armmUSDC et **48 330** armmXDAI au moment de la rédaction de la proposition) pour les lecteurs techniques.

### Taux de participation à 100 %

Le taux de **participation DAO** est fixé à **100 %** : pour **100 $** remboursés par l’emprunteur en stablecoins via le mécanisme, la DAO apporte **100 $** supplémentaires pour financer la migration de la dette stablecoin vers la **dREUSD**. L’objectif affiché est d’**éviter** qu’il reste des fractions de stablecoins **récupérables par des bots** au lieu d’alimenter proprement la migration.

### Plafond de participation par portefeuille (rampe dans le temps)

Le plafond par **wallet** commence à **100 REUSD** (équivalent), puis **double tous les quinze jours** par rapport au plafond de la période précédente, jusqu’à un maximum de **1 600 REUSD** (séquence du type 100, 200, 400, 800 puis 1 600). Sur environ **deux mois et demi**, chaque emprunteur voit ainsi son **plafond individuel** monter progressivement, ce qui cherche un compromis entre **attractivité**, **équité** entre participants et **maîtrise** du budget DAO.

### Verrouillage du REG et ratio dREUSD

Les **REG** doivent être **verrouillés** ; chaque REG verrouillé ouvre un plafond de migration d’au plus **2 dREUSD** (ratio **2 dREUSD par REG**). Si le **prix du REG** évolue fortement, la gouvernance pourra **revoter** pour adapter ce plafond.

### Durée minimale de la phase 1

La **durée minimale** de la phase 1 est fixée à **cinq mois** à compter de son **lancement**. Pendant cette phase, le programme de migration reste actif, le **taux d’emprunt sur la dREUSD est à 0 %**, et les **taux des stablecoins** USDC et xDAI suivent des **valeurs votées à part** (piste **RIP00042** pour les taux stablecoins). Les **emprunts restent verrouillés** pendant la phase 1 : seuls les **remboursements** sont possibles.

### Logique de calendrier sur cinq mois

La proposition explique qu’après environ **2,5 mois** le plafond individuel atteint son **maximum** (1 600 REUSD), puis qu’environ **2,5 mois supplémentaires** peuvent permettre une **remontée** des taux stablecoins pour **consolider** les effets du programme de migration, d’où l’horizon **minimal** de **cinq mois** pour la phase 1.

### Ce que cela change pour l’emprunteur

Pendant la phase 1, l’emprunteur peut **opter** pour un remboursement avec **contribution DAO** : une partie de la dette en **stablecoins** migre vers une dette en **dREUSD** portée à **0 %** pendant cette phase, au lieu de rester entièrement sur des stablecoins à taux **variable** (dont le **plafond** de taux fait l’objet d’un **vote distinct**). Les paramètres votés cherchent un **compromis** entre ressources de la DAO, attractivité du programme et accessibilité pour tous ; ils s’appuient aussi sur une **consultation** menée sur le forum.

## Motivation

- **Immédiat** : alternative à la surutilisation du RMM.
- **Court terme** : amorcer la **phase 2 du REUSD** via une migration **incitative** (étape 1).
- **Moyen terme** : préparer l’**infrastructure RMM v4**.
- **Long terme** : accroître les **revenus DAO** sur l’emprunt en REUSD (cadrage économique détaillé dans la proposition — ordre de grandeur **×10** sur un même volume d’intérêts illustratif, car la DAO capterait une part bien plus large sur la dette REUSD que sur les pools stablecoins classiques).
- **Principes mis en avant** : optionnel, progressif (3 étapes), incitatif, **valorisation du REG**, votes **modulaires**.

## Les trois étapes du RMM v3.5

Le programme se déploie en **trois étapes** (migration incitative → stabilisation → RMM complet). Sur le protocole, on parle aussi de **phases** 1 à 3 : chacune active ou désactive des fonctions précises (migration, remboursement de la dREUSD, emprunt en REUSD). Le tableau ci-dessous résume **ce qui est permis à chaque phase** ; les paragraphes suivants détaillent le **parcours utilisateur** et le lien avec la feuille de route REUSD.

<table>
<thead>
<tr><th>Phase</th><th>Ce qui se passe</th></tr>
</thead>
<tbody>
<tr><td><strong>Phase 1</strong> <em>(active maintenant)</em></td><td>Migration de dette stablecoin + blocage REG. dREUSD à 0&nbsp;%. Pas de remboursement de dREUSD encore.</td></tr>
<tr><td><strong>Phase 2</strong></td><td>Migration continue. Remboursement de dREUSD activé (en stablecoin ou REUSD). Déblocage de REG proportionnel.</td></tr>
<tr><td><strong>Phase 3</strong></td><td>Fin de la migration. Emprunt direct de REUSD contre collatéral. RMM v3.5 complet.</td></tr>
</tbody>
</table>

Les phases 1 et 2 définissent ensemble la **fenêtre de migration active** — **durée minimale de cinq mois** depuis le lancement. La phase 3 s’active lorsque la **phase 2 de l’écosystème REUSD** est **mature**.

**Étape 1 — migration incitative.** Remboursement en stablecoins avec une option via le **Manager** : complément financé par la DAO selon le **taux de participation voté** (**100 %** pour la première mouture de phase 1, [**RIP00043**](https://www.tally.xyz/gov/realtoken-ecosystem-governance/proposal/640910280800835192023262285687656568134775170449659841348595080639880745966)), **dREUSD sans intérêt** pendant cette phase et **REG verrouillés** pour les plafonds. Cela correspond à la **phase 1** du tableau et amorce la transition vers la **phase 2 du REUSD** au sens roadmap.

**Étape 2 — liquidité et stabilisation.** Pools, arbitrage, parité cible d’environ **1 REUSD pour 1 $**, **intérêts sur la dREUSD** fixés par vote et **remboursement en REUSD** lorsque le dispositif est prêt : c’est la **phase 2** du tableau et la **phase 2 active du REUSD** dans la proposition.

**Étape 3 — RMM v3.5 complet.** **Emprunt direct en REUSD**, émissions pour de **nouveaux cas d’usage** et **marché plus profond** : la **phase 3** du tableau, une fois la phase 2 REUSD **mature**. Si les étapes 1 et 2 réussissent, l’étape 3 est le prolongement **naturel** du programme.

## Les bénéfices du RMM v3.5

**Une aide pour rembourser le RMM.** Le dispositif vise à **faciliter** le remboursement de la dette en stablecoins en proposant un parcours **encadré** et **incitatif**, plutôt que de laisser chaque emprunteur seul face à des taux élevés ou à une liquidité bloquée.

**Un remboursement moins cher grâce à la trésorerie DAO.** La DAO **participe avec sa trésorerie** (selon les paramètres votés, par exemple une **participation à 100 %** en phase 1), ce qui peut **réduire le coût** effectif du remboursement pour ceux qui empruntent le chemin du Manager. Il existe aussi, en parallèle, des **marchés** où l’on peut parfois **rembourser le RMM avec une décote**, par exemple en achetant des **armm** moins chers que la valeur nominale ; un outil pour repérer des offres est [Scappa](https://scappa.battistu.com/). Il faut toutefois souligner que ce type de marché **n’a en général pas une très forte liquidité** et **n’est pas** une façon **durable** de désendetter tout l’écosystème : le RMM v3.5 vise au contraire un cadre **pérenne**, piloté par la gouvernance.

**Mieux repérer qui rembourse.** Les flux et le dispositif de migration permettent d’**identifier plus clairement** les utilisateurs qui **remboursent** leur dette, ce qui aide le **suivi** du programme, la **communication** et l’**ajustement** des paramètres par la DAO.

**Préparer l’écosystème pour la suite.** La v3.5 **prépare le terrain** pour des **projets ultérieurs**, en particulier **RMM v4** et l’**inclusion d’autres devises** ou marchés, en validant dans la pratique des mécaniques de dette, de trésorerie et de votes successifs.

**Plus de revenus pour la DAO sur le REUSD.** Lorsque la dette en **REUSD** / **dREUSD** sera plus active et rémunérée selon les paramètres votés, la DAO peut **capturer une part plus élevée des intérêts** sur cette composante que sur les pools stablecoins classiques (voir le cadrage économique de la proposition d’origine, avec l’ordre de grandeur d’un facteur d’environ **×10** sur un même volume d’intérêts illustratif).

## Étape par étape : Comment migrer votre dette

### 1. Ouvrir le Dashboard

Rendez-vous sur l’onglet **Dashboard** de [rmm.realtoken.network](https://rmm.realtoken.network/). Un nouveau panneau **« Programme REUSD »** apparaît.

Le panneau affiche :

- Votre quota de dette REUSD disponible (diminue au fil des conversions)
- Votre solde de REG dans le wallet (disponibles pour le blocage)
- Les REG déjà bloqués dans le programme
- Un bouton **Convertir la dette stablecoin**
- Un bouton **Retirer les REG** *(inactif en Phase 1)*

### 2. Configurer votre conversion

Cliquez sur **Convertir la dette stablecoin** et renseignez :

- **L’actif** — le stablecoin de votre emprunt (ex. USDC, xDAI)
- **Le montant remboursé** — le total incluant l’abondement DAO

L’interface affiche une décomposition de ce qui sera prélevé sur votre wallet :

<table>
<thead>
<tr><th>Quoi</th><th>Montant</th></tr>
</thead>
<tbody>
<tr><td>Stablecoins prélevés sur votre wallet</td><td>Total ÷ 2</td></tr>
<tr><td>REG bloqués</td><td>Stablecoins remboursés ÷ 2</td></tr>
<tr><td>Contribution DAO (stablecoin)</td><td>Total ÷ 2</td></tr>
</tbody>
</table>

> Si une limite est atteinte (quota, budget, solde REG), un message explicatif apparaît dans l’interface.

### 3. Approuver et exécuter

Approuvez le prélèvement de REG et de stablecoins sur votre wallet, puis confirmez la transaction.

## Pour les plus techniques

### Smart Contract REUSDPoolManager

Le cœur du programme est le contrat `REUSDPoolManager`, déployé sur Gnosis Chain :

[0x371a02f425cfa011969085ff6ec4f8e53bd77360](https://gnosisscan.io/address/0x371a02f425cfa011969085ff6ec4f8e53bd77360)

Quatre fonctions principales, chacune active selon les phases :

<table>
<thead>
<tr><th>Fonction</th><th>Description</th><th>Phases actives</th></tr>
</thead>
<tbody>
<tr><td><code>repayDebtWithStable</code></td><td>Remboursement de dette stablecoin avec subvention DAO + blocage REG</td><td>1 &amp; 2</td></tr>
<tr><td><code>repayReusdWithStable</code></td><td>Remboursement de dREUSD (en stablecoin ou REUSD) + déblocage REG proportionnel</td><td>2 &amp; 3</td></tr>
<tr><td><code>borrowReusd</code></td><td>Emprunt de REUSD contre collatéral</td><td>3 uniquement</td></tr>
<tr><td><code>withdrawReg</code></td><td>Retrait des REG bloqués</td><td>1, 2 &amp; 3</td></tr>
</tbody>
</table>

### Réserve REUSD et tokens associés

<table>
<thead>
<tr><th>Token</th><th>Adresse</th><th>Notes</th></tr>
</thead>
<tbody>
<tr><td><strong>Réserve REUSD</strong></td><td><a href="https://gnosisscan.io/address/0x3390742Ac0DCe14EA6Fcbd5Ae02e2303C5D62Ad9" target="_blank" rel="noopener noreferrer"><code>0x3390742Ac0DCe14EA6Fcbd5Ae02e2303C5D62Ad9</code></a></td><td>Réserve principale</td></tr>
<tr><td><strong>aToken REUSD</strong> (dépôt)</td><td><a href="https://gnosisscan.io/address/0xd04C3b20F08B1D51F7429b2205491183A7b3583F" target="_blank" rel="noopener noreferrer"><code>0xd04C3b20F08B1D51F7429b2205491183A7b3583F</code></a></td><td>Dépôts et retraits bloqués</td></tr>
<tr><td><strong>variableDebtToken</strong> (dREUSD)</td><td><a href="https://gnosisscan.io/address/0x00EDDAE5C334bfe4E929c775Aaa7aee1A116E077" target="_blank" rel="noopener noreferrer"><code>0x00EDDAE5C334bfe4E929c775Aaa7aee1A116E077</code></a></td><td>Mint réservé au REUSDManager ; burn actif pour remboursement et liquidation</td></tr>
<tr><td><strong>stableDebtToken</strong></td><td><a href="https://gnosisscan.io/address/0xF4c85940709aF241316D806b7B07729e9de31071" target="_blank" rel="noopener noreferrer"><code>0xF4c85940709aF241316D806b7B07729e9de31071</code></a></td><td>Désactivé</td></tr>
<tr><td><strong>Contrat InterestRate</strong></td><td><a href="https://gnosisscan.io/address/0x134340085739211A56fC467092058c79B3475F8B" target="_blank" rel="noopener noreferrer"><code>0x134340085739211A56fC467092058c79B3475F8B</code></a></td><td>Initialisé à 0 %</td></tr>
</tbody>
</table>

## Ressources

- [Vote **RIP00040** sur Tally](https://www.tally.xyz/gov/realtoken-ecosystem-governance/proposal/1401729377552517862159119104352447734711165592875340838992095449427178715814)
- [Vote **RIP00043** sur Tally](https://www.tally.xyz/gov/realtoken-ecosystem-governance/proposal/640910280800835192023262285687656568134775170449659841348595080639880745966)
- [Proposition sur le forum (cadre RMM v3.5)](https://forum.realtoken.community/d/122)
- [Proposition sur le forum (paramètres phase 1, RIP00043)](https://forum.realtoken.community/d/127)
- [FAQ REUSD](https://faq.realt.co/en/article/what-is-the-reusd-1qotto0/)
- [Tuto communautaire REUSD](https://community-realt.gitbook.io/tuto-community/site-realt/bon-dachat-voucher-reusd)
- [Documentation RMM](https://community-realt.gitbook.io/tuto-community/defi-realt/rmm)
