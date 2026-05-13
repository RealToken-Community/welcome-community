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

**Chronologie indicative** : depuis le **16 janvier 2026**, débat sur la **crise de liquidité** du RMM ; **5 mars 2026**, publication de la proposition v3.5 ; **17–18 mars 2026**, vote [**RIP00040**](https://www.tally.xyz/gov/realtoken-ecosystem-governance/proposal/1401729377552517862159119104352447734711165592875340838992095449427178715814) sur le lancement du développement ; discussions sur le forum depuis le **28 mars 2026** autour des paramètres ; **11 avril 2026**, ouverture du vote [**RIP00043**](https://www.tally.xyz/gov/realtoken-ecosystem-governance/proposal/640910280800835192023262285687656568134775170449659841348595080639880745966) sur une première mouture des paramètres de **phase 1** (durée du vote et calendrier d’application à prendre sur la [proposition sur le forum](https://forum.realtoken.community/d/127)).

**Situation du RMM v3** (à la date des débats) : utilisation **~100 %**, taux d’emprunt en stablecoins **supérieurs à 30 %** annuel, ordre de grandeur **~14,4 M$ empruntés** pour **~48 M$ de TVL**, **déposants bloqués** sur les retraits en stablecoins. La DAO capte une **part des intérêts** sur les emprunts (paramètre de protocole), mais la saturation pénalise emprunteurs, déposants et croissance.

**Objet du vote** [**RIP00040**](https://www.tally.xyz/gov/realtoken-ecosystem-governance/proposal/1401729377552517862159119104352447734711165592875340838992095449427178715814) : la communauté a validé le principe que **RealT développe** des **fonctionnalités optionnelles** pour **réduire la surutilisation** du RMM, décrites dans la **proposition sur le forum**, avec **mise en œuvre par phases**. Ce vote **autorise le développement** ; il pose le **cadre** du RMM v3.5.

**Budget développement** : selon la proposition initiale, **aucun coût** pour la communauté sur ce volet de développement — **RealT** porte les dépenses correspondantes.

## En une phrase : qu’est-ce que le RMM v3.5 ?

Le **RMM v3.5**, c’est d’abord une **option** : vous pouvez **déplacer une partie de votre dette** en stablecoins (USDC, xDAI) vers une dette en **REUSD** (**dREUSD**), si vous le souhaitez, sans remplacer le fonctionnement habituel du RMM. Au **début**, le montant migrable par portefeuille est **plafonné bas** (autour de **100 dollars** d’équivalent), puis ce **plafond monte dans le temps** pour laisser plus de place à ceux qui participent au programme. Pour en bénéficier, il faut **verrouiller des REG** dans un **coffre-fort** prévu par le protocole : chaque REG verrouillé ouvre jusqu’à **2 dREUSD** de capacité de migration. En parallèle, la **DAO** met sa **trésorerie** dans la balance : elle **double l’effet** de votre remboursement (**100 %** de participation), comme une **incitation** à migrer la dette vers la dREUSD plutôt que de la laisser uniquement en stablecoins.

## Vote [RIP00043](https://www.tally.xyz/gov/realtoken-ecosystem-governance/proposal/640910280800835192023262285687656568134775170449659841348595080639880745966) : premiers paramètres pour la phase 1

Après le [**RIP00040**](https://www.tally.xyz/gov/realtoken-ecosystem-governance/proposal/1401729377552517862159119104352447734711165592875340838992095449427178715814), la DAO a voté une **première version** des paramètres applicables à la **phase 1** du déploiement du RMM v3.5, détaillée sur la [proposition sur le forum](https://forum.realtoken.community/d/127). Ces réglages pourront encore être **modifiés** par de **nouveaux votes** selon l’avancement du programme.

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

## REUSD vs « stablecoin »

Le **REUSD** est un **token de dette** de l’écosystème, pas un stablecoin « classique ». Sur le RMM, les rôles diffèrent : stablecoins **déposables et empruntables** ; RealTokens en **collatéral** ; REUSD **empruntable** (pas déposable comme un stablecoin externe), etc. — voir la proposition pour le tableau complet.

**Convention temporelle « REUSD »** (selon la doc de proposition) :

- **Étape 1** : « REUSD » désigne surtout la **dette** liée à la participation DAO (dREUSD) ; **pas** d’émission du token REUSD transférable tel qu’en circulation aujourd’hui pour ce mécanisme.
- **Étape 2** : dette **et** token REUSD déjà en circulation ; pas de nouvelles émissions « massives » décrites comme en phase 1.
- **Étape 3** : le terme peut couvrir **token** et **dette** ; création de dREUSD alignée sur la mécanique RMM (équivalent comptable aux dettes USDC / xDAI).

## Les trois étapes du RMM v3.5

L’**étape 1**, dite migration incitative, propose de rembourser en stablecoins avec une option passant par le « Manager » : un complément financé par la DAO selon le **taux de participation voté** (fixé à **100 %** pour la première mouture de phase 1 par le [**RIP00043**](https://www.tally.xyz/gov/realtoken-ecosystem-governance/proposal/640910280800835192023262285687656568134775170449659841348595080639880745966)), des **dREUSD sans intérêt** pendant cette phase, et un **verrouillage de REG** pour définir les plafonds. Elle s’inscrit dans la transition entre la phase 1 et la phase 2 du REUSD.

L’**étape 2** vise la liquidité et la stabilisation : pools, arbitrage, une parité cible d’environ un REUSD pour un dollar, des intérêts sur la dREUSD fixés par vote, et la possibilité de rembourser en REUSD. C’est la phase 2 active du REUSD.

L’**étape 3** correspond au RMM v3.5 complet : emprunt direct en REUSD, émission pour de nouveaux cas d’usage, et une plus grande profondeur de marché, lorsque la phase 2 du REUSD est mature.

Si les étapes 1 et 2 réussissent, l’étape 3 est présentée comme le prolongement **naturel**.

## Les bénéfices du RMM v3.5

**Une aide pour rembourser le RMM.** Le dispositif vise à **faciliter** le remboursement de la dette en stablecoins en proposant un parcours **encadré** et **incitatif**, plutôt que de laisser chaque emprunteur seul face à des taux élevés ou à une liquidité bloquée.

**Un remboursement moins cher grâce à la trésorerie DAO.** La DAO **participe avec sa trésorerie** (selon les paramètres votés, par exemple une **participation à 100 %** en phase 1), ce qui peut **réduire le coût** effectif du remboursement pour ceux qui empruntent le chemin du Manager. Il existe aussi, en parallèle, des **marchés** où l’on peut parfois **rembourser le RMM avec une décote**, par exemple en achetant des **armm** moins chers que la valeur nominale ; un outil pour repérer des offres est [Scappa](https://scappa.battistu.com/). Il faut toutefois souligner que ce type de marché **n’a en général pas une très forte liquidité** et **n’est pas** une façon **durable** de désendetter tout l’écosystème : le RMM v3.5 vise au contraire un cadre **pérenne**, piloté par la gouvernance.

**Mieux repérer qui rembourse.** Les flux et le dispositif de migration permettent d’**identifier plus clairement** les utilisateurs qui **remboursent** leur dette, ce qui aide le **suivi** du programme, la **communication** et l’**ajustement** des paramètres par la DAO.

**Préparer l’écosystème pour la suite.** La v3.5 **prépare le terrain** pour des **projets ultérieurs**, en particulier **RMM v4** et l’**inclusion d’autres devises** ou marchés, en validant dans la pratique des mécaniques de dette, de trésorerie et de votes successifs.

**Plus de revenus pour la DAO sur le REUSD.** Lorsque la dette en **REUSD** / **dREUSD** sera plus active et rémunérée selon les paramètres votés, la DAO peut **capturer une part plus élevée des intérêts** sur cette composante que sur les pools stablecoins classiques (voir le cadrage économique de la proposition d’origine, avec l’ordre de grandeur d’un facteur d’environ **×10** sur un même volume d’intérêts illustratif).

## Ressources

- [Vote **RIP00040** sur Tally](https://www.tally.xyz/gov/realtoken-ecosystem-governance/proposal/1401729377552517862159119104352447734711165592875340838992095449427178715814)
- [Vote **RIP00043** sur Tally](https://www.tally.xyz/gov/realtoken-ecosystem-governance/proposal/640910280800835192023262285687656568134775170449659841348595080639880745966)
- [Proposition sur le forum (cadre RMM v3.5)](https://forum.realtoken.community/d/122)
- [Proposition sur le forum (paramètres phase 1, RIP00043)](https://forum.realtoken.community/d/127)
- [FAQ REUSD](https://faq.realt.co/en/article/what-is-the-reusd-1qotto0/)
- [Tuto communautaire REUSD](https://community-realt.gitbook.io/tuto-community/site-realt/bon-dachat-voucher-reusd)
- [Documentation RMM](https://community-realt.gitbook.io/tuto-community/defi-realt/rmm)
