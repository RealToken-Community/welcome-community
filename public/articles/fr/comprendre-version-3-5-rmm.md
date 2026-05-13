---
title: "Comprendre la version 3.5 du RMM"
date: "2026-05-13"
description: "Suite au vote RIP00040, la version 3.5 du RMM est en ligne et le projet prévoit trois étapes dans le temps pour faire évoluer le protocole progressivement."
tags: ["rmm", "defi", "reusd", "gouvernance"]
author: "Equipe Realtoken DAO"
imageHeader: "rmm-v3-5-blog.png"
---

# Comprendre la version 3.5 du RMM

Cet article **condense** la [proposition sur le forum RealToken](https://forum.realtoken.community/d/122) et le vote **[RIP00040] Launch of RMM Version 3.5 Development** (mi-mars 2026). Il ne remplace pas le texte complet.

## Contexte : pourquoi en parler maintenant ?

**Chronologie indicative** : depuis le **16 janvier 2026**, débat sur la **crise de liquidité** du RMM ; **5 mars 2026**, publication de la proposition v3.5 ; **17–18 mars 2026**, vote sur le **lancement du développement** (mandat technique — pas encore le déploiement de paramètres précis).

**Situation du RMM v3** (à la date des débats) : utilisation **~100 %**, taux d’emprunt en stablecoins **supérieurs à 30 %** annuel, ordre de grandeur **~14,4 M$ empruntés** pour **~48 M$ de TVL**, **déposants bloqués** sur les retraits en stablecoins. La DAO capte une **part des intérêts** sur les emprunts (paramètre de protocole), mais la saturation pénalise emprunteurs, déposants et croissance.

**Objet du vote RIP00040** : la communauté est interrogée sur le principe que **RealT développe** de **nouvelles fonctionnalités optionnelles** visant à **réduire la surutilisation** du RMM, décrites dans la **proposition sur le forum**, avec **mise en œuvre par phases**. Ce vote **autorise le développement** ; il **ne fixe pas** les paramètres de déploiement — ceux-ci feront l’objet de **votes séparés** (taux de participation, ratio REG / dREUSD, enveloppe DAO, plafonds, durées, taux stablecoins, etc.).

**Budget** : selon la proposition, **aucun coût** pour la communauté sur ce volet — **RealT** porte les dépenses de développement correspondantes.

## En une phrase : qu’est-ce que le RMM v3.5 ?

Une **couche complémentaire et facultative** au **RMM Core v3 inchangé** : nouveau **pool REUSD**, **REUSD Manager** pour la migration de dette et les plafonds, et **trois étapes** pour passer d’une **migration incitative** à un **RMM v3.5 complet**, tout en préparant **REUSD phase 2** et les mécaniques de **RMM v4**.

## Motivation

- **Immédiat** : alternative à la surutilisation du RMM (100 %, 30 %+).
- **Court terme** : amorcer la **phase 2 du REUSD** via une migration **incitative** (étape 1).
- **Moyen terme** : préparer l’**infrastructure RMM v4**.
- **Long terme** : accroître les **revenus DAO** sur l’emprunt en REUSD (cadrage économique détaillé dans la proposition — ordre de grandeur **×10** sur un même volume d’intérêts illustratif, car la DAO capterait une part bien plus large sur la dette REUSD que sur les pools stablecoins classiques).
- **Principes mis en avant** : optionnel, progressif (3 étapes), incitatif, **valorisation du REG**, votes **modulaires**, architecture **résiliente** et **open source**.

## REUSD vs « stablecoin »

Le **REUSD** est un **token de dette** de l’écosystème, pas un stablecoin « classique ». Sur le RMM, les rôles diffèrent : stablecoins **déposables et empruntables** ; RealTokens en **collatéral** ; REUSD **empruntable** (pas déposable comme un stablecoin externe), etc. — voir la proposition pour le tableau complet.

**Convention temporelle « REUSD »** (selon la doc de proposition) :

- **Étape 1** : « REUSD » désigne surtout la **dette** liée à la participation DAO (dREUSD) ; **pas** d’émission du token REUSD transférable tel qu’en circulation aujourd’hui pour ce mécanisme.
- **Étape 2** : dette **et** token REUSD déjà en circulation ; pas de nouvelles émissions « massives » décrites comme en phase 1.
- **Étape 3** : le terme peut couvrir **token** et **dette** ; création de dREUSD alignée sur la mécanique RMM (équivalent comptable aux dettes USDC / xDAI).

## Les trois étapes du RMM v3.5

L’**étape 1**, dite migration incitative, propose de rembourser en stablecoins avec une option passant par le « Manager » : un complément financé par la DAO selon un taux de participation voté, des dREUSD sans intérêt pendant cette phase, et un verrouillage de REG pour définir les plafonds. Elle s’inscrit dans la transition entre la phase 1 et la phase 2 du REUSD.

L’**étape 2** vise la liquidité et la stabilisation : pools, arbitrage, une parité cible d’environ un REUSD pour un dollar, des intérêts sur la dREUSD fixés par vote, et la possibilité de rembourser en REUSD. C’est la phase 2 active du REUSD.

L’**étape 3** correspond au RMM v3.5 complet : emprunt direct en REUSD, émission pour de nouveaux cas d’usage, et une plus grande profondeur de marché, lorsque la phase 2 du REUSD est mature.

Si les étapes 1 et 2 réussissent, l’étape 3 est présentée comme le prolongement **naturel**.

## Étape 1 : ce que fait l’utilisateur

- **Option A** : remboursement **classique** RMM v3 (inchangé).
- **Option B** : via le **REUSD Manager** — remboursement en USDC / xDAI avec **participation DAO** selon un **taux de participation** (ex. 10 % : 100 $ remboursés → 110 $ de dette totale traitée, dont 10 $ en dREUSD à 0 % — exemples dans la proposition).

**Quatre plafonds cumulatifs** (tous respectés à la fois) : dette stablecoins existante ; **REG verrouillés** × **ratio REG / dREUSD** (ex. indicatif **1 REG = 2 dREUSD** à calibrer) ; **plafond individuel** ; **enveloppe globale** DAO. La trésorerie peut mobiliser des **armm** (USDC / WXDAI) et le Manager peut orchestrer **remboursement + échange** en une transaction pour limiter la capture immédiate de liquidité.

La **dREUSD** reste **garantie** comme la dette stablecoin par le **collatéral** existant (health factor, liquidations).

**Taux stablecoins** : votes **séparés** mais **coordonnés** — possibilité de **0 % temporaire** puis **remontée progressive** pour laisser le temps à la communauté (trade-off : déposants moins rémunérés pendant la période à 0 %).

**Sortie d’étape 1** (conditions cumulatives, à calendrier DAO) : demande stabilisée, enveloppe stabilisée, **utilisation RMM** redescendue (cible **&lt; 100 %**), taux stablecoins **revenus** à un niveau convenu. Durée indicative : **plusieurs mois** (souvent **3 à 6+** mois évoqués).

## Gouvernance : votes modulaires

Approche recommandée : **un vote** pour le concept / mandat de dev, puis **votes par paramètre** (participation, ratio REG, enveloppe, plafond perso, durée minimale, taux 0 % et remontée, etc.), puis **votes récurrents** (ajustements, passage d’étape). Cela limite le « tout ou rien » et permet l’**itération**.

## Feuille de route indicative

- **Mars 2026** : discussion + vote lancement v3.5.
- **Avril 2026** : si accord, RealT prépare les **paramètres d’usage**, la DAO **vote** dessus.
- **Mai 2026** : **début de l’étape 1** (si calendrier tenu).
- **2026–2027** : enchaînement des phases selon **durées votées**.

## Risques

La proposition liste notamment : défaut / liquidation, **liquidité** soudaine REUSD → stablecoins, **dépeg**, erreurs de **gouvernance** — avec mitigations (plafonds, réserves, stabilisation étape 2, éducation).

## Ressources

- [Proposition sur le forum (v3.5 du RMM)](https://forum.realtoken.community/d/122)
- [FAQ REUSD](https://faq.realt.co/en/article/what-is-the-reusd-1qotto0/)
- [Tuto communautaire REUSD](https://community-realt.gitbook.io/tuto-community/site-realt/bon-dachat-voucher-reusd)
- [Documentation RMM](https://community-realt.gitbook.io/tuto-community/defi-realt/rmm)
