####Vision, Philosophie et Portée du Produit####

### 1. Vision, Philosophie et Portée du Produit

Cette section définit l'ADN du projet LOTO-AI. Elle établit non seulement ce que le logiciel fait, mais surtout pourquoi il le fait et comment il transforme l'expérience de cadenassage industriel.

**1.1 La Vision : Révolutionner la Conformité par l'Intelligence**
La création de fiches de cadenassage est historiquement un processus lourd, manuel et fragmenté, souvent source d'erreurs humaines et de non-conformités. La vision de LOTO-AI est de transformer cette corvée administrative en un processus fluide, assisté et sécurisé.

L'objectif fondamental est de définir ce que l'IA doit fournir pour soutenir la conception, la rédaction, la mise à jour et la standardisation des fiches, en stricte conformité avec le cadre réglementaire complexe (RSST, CSA Z460, CSA Z462).

Nous ne construisons pas un simple éditeur de texte, mais un "Accélérateur de Conformité". L'outil vise trois piliers majeurs :

* **Accélération :** Réduire le temps de cycle entre l'enquête terrain et l'approbation finale, en automatisant la rédaction et la mise en forme.
* **Standardisation :** Garantir que, peu importe quel technicien rédige la fiche, le résultat final (vocabulaire, séquences, visuel) soit identique et harmonisé selon les règles internes de l'entreprise.
* **Clarté Visuelle et Sécurité :** Produire des documents où l'interprétation ne laisse aucune place au doute, grâce à des photos annotées intelligemment et des instructions précises.

**1.2 La Philosophie : "Le Copilote d'Investigation"**
L'approche utilisateur repose sur une philosophie distincte : l'humain reste le pilote, mais l'IA est le navigateur expert.

**A. L'Analogie du "Sherlock Holmes Industriel"**
Plutôt que de demander à l'utilisateur de remplir un formulaire vide, LOTO-AI agit comme un enquêteur. L'application capture des "indices" multimodaux sur le terrain (photos, notes vocales, textes). L'IA analyse ensuite ces preuves pour déduire la procédure. Elle identifie les sources d'énergie (électrique, pneumatique, mécanique, etc.) et propose les points de coupure logiques.

**B. Architecture Découplée et Zéro Friction ("Offline-First")**
La réalité du terrain (salles mécaniques, sous-sols, zones blanches) impose une contrainte technique majeure qui devient une philosophie de design : l'outil doit être totalement opérationnel sans connexion internet. L'architecture est strictement découplée : l'application mobile est un outil de collecte autonome et sécurisé, tandis que l'application Web sert de cockpit d'assemblage une fois la connexion rétablie.

**C. Le Gardien Normatif (The Gatekeeper)**
Le logiciel intègre une philosophie de "Sûreté par Design". Il ne se contente pas de mettre en page ; il veille au respect des normes.

* Il force l'intégration des avertissements normatifs obligatoires (ex: risques d'arc électrique selon CSA Z462).
* Il applique les politiques internes strictes, comme l'interdiction de sectionneurs en hauteur ou l'obligation de purges.
* Il produit un inventaire des non-conformités (classé par code couleur) avec recommandations correctives si des éléments manquent.

**1.3 La Portée du Produit (Scope)**
La portée définit les frontières fonctionnelles de l'IA et de l'humain au sein de l'application.

**Ce que l'IA prend en charge (L'Automatisation)**
L'IA est responsable du travail lourd et répétitif :

* **Analyse et Structuration :** Elle interprète les photos et schémas pour identifier les énergies et proposer des points de coupure avec explications fonctionnelles.
* **Rédaction Automatisée :** Elle rédige le texte complet, incluant les séquences de cadenassage (Mise à l'arrêt) et, par effet miroir, les séquences de décadenassage (Remise en fonction).
* **Documentation Complémentaire :** Elle génère les descriptions techniques, les impacts fonctionnels et les risques résiduels.
* **Annotation Visuelle :** Elle place automatiquement les balises (E1, P1) sur les photos pour une identification claire.

**Ce que l'IA ne fait PAS (Les Limites de Responsabilité)**
Pour des raisons légales et de sécurité, des limites strictes sont posées :

* L'IA ne valide jamais physiquement l'énergie zéro (c'est le rôle de la personne qualifiée avec son multimètre/manomètre).
* L'IA ne signe pas et n'approuve pas la fiche (c'est la responsabilité de l'employeur/auditeur).
* L'IA ne remplace pas le jugement de la personne qualifiée.

####Architecture Utilisateur et Rôles (Intégrateur, Auditeur, Admin)####

### 2. Architecture Utilisateur et Rôles (Intégrateur, Auditeur, Admin)

L'architecture de LOTO-AI repose sur une ségrégation stricte des tâches et des responsabilités pour assurer l'intégrité du processus de sécurité. Le système orchestre la collaboration entre trois acteurs clés via une base de données unifiée, accessible par deux interfaces distinctes (Mobile et Web).

Cette structure reflète les exigences légales qui distinguent la conception de la validation.

**2.1 L'Intégrateur (Le Concepteur et Enquêteur Terrain)**
Ce rôle correspond au "Concepteur désigné" mentionné dans les responsabilités du projet. C'est l'utilisateur opérationnel, souvent un technicien de maintenance ou un consultant externe.

* **Interface Principale :** Application Mobile (Optimisée pour la collecte multimodale et l'usage "Offline-First").
* **Mode opératoire :** Il agit comme les yeux et les oreilles du système sur le plancher de l'usine.
* **Responsabilités et Tâches :** Collecte de Preuves (Input), Interprétation Initiale, et Validation du Brouillon. Limites : L'intégrateur prépare le travail mais ne possède pas l'autorité finale pour "approuver" la fiche au sens légal du terme.

**2.2 L'Auditeur (L'Expert Technique et Approbateur)**
Ce rôle fusionne les responsabilités de la "Personne qualifiée" et de l'"Employeur" définies dans le cadre du projet. C'est le garant de la conformité réglementaire (RSST, CSA Z460).

* **Interface Principale :** Application Web (Le "Cockpit" de gestion).
* **Mode opératoire :** Il intervient en post-traitement pour l'analyse, la correction technique et la signature.
* **Responsabilités et Tâches :** Validation Technique (Énergie Zéro), Revue des Non-Conformités, Contrôle Normatif, et Approbation (Signature finale).

**2.3 L'Administrateur (Le Gardien du Standard et des Accès)**
Ce rôle correspond aux gestionnaires du système responsables de la configuration globale, de la sécurité d'accès et de la standardisation.

* **Interface Principale :** Panneau d'Administration Web.
* **Mode opératoire :** Configuration en amont (Set & Forget) et maintenance des standards.
* **Responsabilités et Tâches :**
* **Gestion des "Kits de Sécurité" :** Paramétrage du moteur de règles.
* **Gestion Avancée des Utilisateurs (CRUD) :** Création, modification et suppression des comptes.
* **Matrice de Rôles Personnalisée :** Au-delà des rôles de base, l'admin peut personnaliser les permissions (ex: accorder le droit d'approbation exceptionnel à un Intégrateur senior).



**2.4 Gestion des Profils et Flux de Collaboration**
Pour garantir la traçabilité et l'authenticité des signatures, chaque utilisateur dispose d'un **Profil Utilisateur** qu'il gère de manière autonome (modification du mot de passe, mise à jour de la Photo, Prénom, Nom, Titre professionnel). Ces métadonnées sont cruciales car elles sont incrustées dans le PDF final.

Le flux de travail est linéaire et sécurisé : L'Intégrateur collecte -> L'IA traite -> L'Intégrateur révise -> L'Auditeur valide et signe.

####Fondation et Configuration : Le "Kit de Sécurité"####

### 3. Fondation et Configuration : Le "Kit de Sécurité"

Cette section décrit le module paramétrique central de LOTO-AI. Avant même de rédiger la première ligne d'une fiche, le système doit être "encodé" avec l'ADN de sécurité de l'entreprise.

Le "Kit de Sécurité" n'est pas un simple menu d'options ; c'est un moteur de règles qui garantit la Normalisation et l'application stricte des Règles internes.

**3.1 Le Gabarit Client Codé en Dur (Hardcoded Template)**
Pour assurer une fiabilité et une stabilité maximales à cette étape du projet, l'application est configurée autour d'un modèle JSON "hardcoded" spécifique aux standards du client (ex: modèle Bombardier/Maximo). Cette rigidité structurelle garantit une transition fluide.

* **En-tête (Header) :** Définition des métadonnées obligatoires (ID Maximo, description, coordonnées EST/NORD).
* **Tableaux Séquentiels :** Configuration des colonnes immuables : "No", "Réf Photo", "Instruction", "Type Énergie", "Mécanisme".
* **Pied de Page et Branding :** Blocs de signature requis et intégration du logo et des codes couleurs de sécurité de l'entreprise. *(Note : Un constructeur de gabarit visuel pourra être envisagé comme évolution future).*

**3.2 Matrice d'Énergie et Iconographie**
Pour satisfaire l'exigence d'identification claire, le Kit définit le langage visuel que l'IA devra appliquer :

* **Standardisation des Annotations :** Utilisation exclusive de l'Hexagone Rouge pour les points de coupure.
* **Nomenclature :** Règles de nommage imposées (E=Électrique, P=Pneumatique).
* **Liste de Matériel Autorisée :** Base de données des dispositifs d'isolation approuvés (Cadenas, Moraillon, etc.).

**3.3 Le Gardien Normatif (Zone de Configuration et Snippets)**
C'est le "cerveau" légal du système.

* **Zone de Configuration des Normes (Paste Zone) :** L'administrateur dispose d'une interface pour coller le texte brut des normes (RSST, Guides CNESST) et des politiques internes. Ce texte sert de "Livre de Loi" et de contexte direct aux agents d'analyse de conformité IA.
* **Les "Snippets" Cadenassés :** Blocs de textes immuables injectés par le système (Avertissements généraux, Protocoles d'urgence).
* **Checklist Configurable :** L'admin configure le contenu texte et les cases à cocher de la popup de pré-soumission ("Stupid Check").

**3.4 Logique Conditionnelle (If/Then Rules)**
L'administrateur configure des déclencheurs :

* Si Électrique > 50 Volts -> Insérer l'avertissement Arc Flash (CSA Z462).
* Si Hydraulique/Pneumatique -> Forcer l'ajout d'une étape de purge (RSST Art 185).

####Phase 1 : Acquisition Terrain (Application Mobile Offline-First)####

### 4. Phase 1 : Acquisition Terrain (Application Mobile Offline-First)

Cette phase représente le point d'entrée névralgique du système. Elle est conçue pour l'Intégrateur qui évolue dans un environnement industriel hostile. L'application mobile n'est pas une version réduite du site web ; c'est un outil spécialisé de collecte de preuves ("Evidence Gathering Tool") conçu pour l'efficacité.

**4.1 Architecture "Offline-First" et Robustesse**
Indépendance Réseau : L'intégrateur peut effectuer sa tournée de plancher complète sans jamais se connecter au réseau. En cas de crash, la session est préservée localement. Aucune donnée n'est perdue.

**4.2 Intelligence Visuelle Embarquée (Mobile AI)**
L'application ne se contente pas de stocker des pixels en attendant une synchronisation. L'analyse Multimodale est effectuée **directement dans l'application mobile** (On-Device). Dès la capture d'une photo, l'IA locale génère immédiatement la description détaillée (leviers, vannes) et permet l'annotation vectorielle avancée sur le terrain.

**4.3 Initialisation de la Fiche et Géolocalisation**

* **Identification Maximo/ERP :** L'utilisateur saisit l'identifiant unique.
* **Reconnaissance Optique (OCR) :** Scan de la plaque signalétique pour extraire Modèle/Série.
* **Géolocalisation Automatique :** Capture des coordonnées GPS actuelles.
* **Photo Maîtresse :** Plan large de référence.

**4.4 Interface de Capture Multimodale (Mode Focus)**
L'interface est minimaliste ("Focus Mode") pour l'usage à une main.

* **La Caméra Augmentée :** Vérification de la netteté en temps réel.
* **Toggle "Note Audio Auto" :** Fonctionnalité clé. Lorsqu'activée, l'application lance automatiquement l'enregistrement audio immédiatement après chaque prise de photo, liant fortement le contexte (1 Photo = 1 Audio).
* **Notes et Drapeaux :** Saisie rapide de texte et marqueurs d'urgence.

**4.5 Gestion Multi-Sessions et Synchronisation Intelligente**
L'intégrateur peut mettre en pause la session de la machine A pour commencer la machine B. Dès que la connexion réseau est rétablie, l'application pousse les paquets de données (JSON + Binaires) vers le cloud. L'utilisateur reçoit une notification quand la fiche est prête à être éditée dans le Cockpit Web.

####Phase 2 : Le Cockpit de Création (Application Web)####

### 5. Phase 2 : Le Cockpit de Création (Application Web)

L'Intégrateur accède au "Cockpit", l'interface Web centrale. C'est un Atelier de Fusion où les preuves brutes sont transformées par l'IA. Le système doit être "Responsive" (fonctionnel sur mobile via navigateur), bien que l'expérience soit optimisée pour Desktop. L'interface adopte un design "Clean UI" moderne, épuré, en "Light Mode" par défaut pour une lisibilité technique maximale.

**5.1 Architecture de l'Interface : Le "Split Screen" (Écran Scindé)**
L'ergonomie repose sur une division verticale stricte de l'écran : "Preuve à Gauche, Conclusion à Droite". Un **QR Code** est visible sur le Cockpit, permettant de scanner avec le mobile pour rouvrir instantanément la fiche sur le terrain.

**A. Panneau Gauche : Le Hub d'Investigation et Mode Chatbot**

* **Flux Multimodal Synchronisé :** Photos chronologiques avec transcriptions textuelles. L'utilisateur peut **éditer les inputs bruts** (modifier une note vocale mal transcrite) directement ici.
* **Mode Chatbot Contextuel :** Interface de discussion pour demander des modifications à l'IA (le chat conserve tout le contexte de la machine).
* **Conteneur de Documents (RAG) :** Ingestion de manuels PDF.

**B. Panneau Droit : Le Double Éditeur (WYSIWYG & Tableau)**
L'utilisateur dispose de deux vues complémentaires pour manipuler le résultat :

1. **Vue Éditeur (WYSIWYG) :** Rendu final fidèle à l'impression (logos, couleurs, marges).
2. **Vue "Tableau Structuré" :** Grille optimisée pour l'édition rapide et massive des variables, permettant une manipulation directe des données.

**5.2 Moteur de Génération IA (Génération Structurée)**
L'IA combine les Inputs avec les Instructions Système. La génération est contrainte par un Schéma JSON strict qui distingue les champs de texte IA, les textes statiques, et les énumérations.

* **Analyse et Structuration :** Détection des énergies et proposition des points de coupure.
* **La Logique "Miroir" (Décadenassage) :** Intégrée directement dans le prompt système, l'IA génère la section de décadenassage par inversion stricte de la séquence de verrouillage (LIFO - Last In, First Out ; "OFF" devient "ON").

**5.3 Expérience d'Édition Hybride et Versionning**

* **Édition Manuelle :** L'utilisateur peut modifier n'importe quel champ dans la vue tableau, y compris les **Métadonnées** (Nom de la fiche, ID Machine).
* **Bouton "Magic Reformulation" :** Réécriture d'un champ spécifique via l'IA.
* **Visual Diff et Historique :** Chaque modification crée une version (V1.1, V1.2). Le Visual Diff affiche les changements en surbrillance (Rouge/Vert) sur le document.

####Phase 3 : Intelligence Visuelle et Annotation (Overlay)####

### 6. Phase 3 : Intelligence Visuelle et Annotation (Overlay)

Dans le domaine du cadenassage, une image vaut mille mots. L'objectif est de transformer une photo brute en un diagramme technique précis.

**6.1 L'Interaction "Drag & Match" (Glisser-Associer)**
L'Intégrateur clique sur une photo dans le flux d'inputs à gauche et la glisse directement sur une étape du JSON à droite. Ce geste donne le contexte à l'IA : "Cette image représente ce dispositif".

**6.2 Moteur d'Annotation Automatique (Computer Vision)**
L'IA scanne l'image pour identifier les composants industriels (leviers, vannes, manomètres) et place intelligemment les balises (Bounding Box) dans une zone neutre pour ne pas masquer les informations critiques.

**6.3 La Technologie de Calque Vectoriel (Overlay Éditable)**
L'annotation n'est pas "brûlée" dans les pixels de l'image. C'est un calque vectoriel superposé.

* **Édition Non-Destructive :** L'Intégrateur peut déplacer l'hexagone. La flèche se redessine dynamiquement.
* **Mise à Jour des Données :** Si le nom "E1" change dans le texte, l'hexagone sur la photo se met à jour automatiquement.
* **Clarté à l'Impression :** Netteté parfaite au zoom.

**6.4 Gestion des Vues Multiples et Zoom**
Recadrage Intelligent (Smart Crop) et vues Macro/Micro pour gérer les différents niveaux de détails.

####Phase 4 : Conformité Normative et Analyse (Le Gardien)####

### 7. Phase 4 : Conformité Normative et Analyse (Le Gardien)

Cette phase est le pilier central. L'IA agit comme un "Gardien de la Conformité" (Gatekeeper) en interceptant les erreurs avant la soumission.

**7.1 Moteur d'Analyse Sémantique et Normative**
L'agent d'analyse compare la fiche générée avec la base de connaissances collée dans la configuration (Livre de loi). Il vérifie la complétude de la séquence "Énergie Zéro" (Action -> Vérification), gère la Sécurité Électrique Avancée (Tensions > 50V), et assure la Cohérence Matérielle (comptage croisé cadenas vs étapes).

**7.2 Inventaire des Non-Conformités : Le Code Couleur "Feu de Circulation"**
Le système génère un rapport d'audit classifiant les risques de manière intuitive :

* 🔴 **Rouge (Bloquant/Critique) :** Violations directes de la loi (ex: Absence de cadenas sur un point de coupure). La soumission est impossible.
* 🟡 **Jaune (Avertissement/Moyen) :** Non-respect des règles internes ou bonnes pratiques (ex: description manquant de précision).
* 🟢 **Vert (Conforme) :** Éléments validés et sécuritaires.

**7.3 Régénération Corrective Assistée**
Pour chaque non-conformité, l'utilisateur a accès à la fonctionnalité de **"Régénération corrective"**. Il peut demander à l'IA de corriger la fiche automatiquement en se basant sur le rapport de non-conformité détaillé.

**7.4 La Checklist de Pré-Soumission (Le "Stupid Check")**
Une fenêtre contextuelle (Popup) obligatoire et configurable apparaît. L'Intégrateur doit cocher activement la validation des éléments physiques (étiquettes plancher, accessibilité) avant de soumettre.

####Phase 5 : Workflow d'Approbation et Cycle de Vie####

### 8. Phase 5 : Workflow d'Approbation et Cycle de Vie

Transformation d'un processus informel en une chaîne de confiance numérique inaltérable.

**8.1 La Soumission et Notification**
Le statut passe de BROUILLON à EN REVUE. La fiche est verrouillée en écriture. L'Auditeur reçoit une notification intelligente résumant les risques clés.

**8.2 L'Interface d'Audit (Le "Red Lining")**
L'Auditeur est en Mode Lecture Seule. Il utilise les Commentaires Contextuels (Pinpointing) pour ancrer son commentaire précisément sur une ligne du tableau. Il valide techniquement la méthode d'isolation proposée pour atteindre l'énergie zéro.

**8.3 Boucle de Correction (Feedback Loop)**
En cas de rejet, l'Intégrateur voit les commentaires. Il peut utiliser la Fonction **"Fix with AI"** pour appliquer la correction suggérée par l'Auditeur.

**8.4 Signature, Auditabilité et Cycle de Vie**

* **Signature Numérique :** Capture de l'identité du Profil Utilisateur, date et heure.
* **Journal d'Audit (Log Complet) :** Le système conserve un log immuable de toutes les actions pour satisfaire les inspecteurs de la CNESST en cas d'accident.
* **Gestion des Révisions :** Création de la V2.0 en cas de modification d'équipement, avec archivage de la V1.0 (Statut OBSOLÈTE).

####Livrables et Sorties (Outputs)####

### 9. Livrables et Sorties (Outputs)

Les sorties ne sont pas de simples exports ; ce sont des documents juridiquement opposables.

**9.1 La Fiche Officielle (PDF Haute Résolution)**
Fidélité visuelle absolue au gabarit client. Qualité vectorielle pour impression et plastification. La traçabilité est incrustée (signatures et métadonnées).

**9.2 Exports de Données Structurées et Inputs (Le Cœur des Données)**
Au-delà du visuel, le système priorise l'accessibilité de la donnée brute :

* **Export JSON :** Téléchargement/Copie du JSON complet de la fiche pour intégration API.
* **Export Excel (.xlsx) :** Idéal pour extraire les listes de matériel vers Maximo/SAP.
* **Export des Inputs :** Récupération des notes et images originales sous format fichiers ou JSON.
*(Note : Un export Word .docx préservant la mise en forme est conservé comme format secondaire legacy).*

**9.3 Accessibilité Terrain et Rapports**

* **QR Code Intelligent :** Scan-to-View pour accéder à la version vivante.
* **Rapport de Gap Analysis :** Inventaire des non-conformités et documentation complémentaire (impacts fonctionnels).

####Infrastructure Technique et Intégration####

### 10. Infrastructure Technique et Intégration

Le socle technologique repose sur la sécurité d'entreprise, la protection des données, et le découplage des services.

**10.1 Gateway API Interne Exclusive (Sécurité Maximale)**
Une exigence technique absolue : **Le système n'effectue aucun appel direct aux API d'IA externes (ex: Gemini).**
Pour garantir la souveraineté des données industrielles sensibles, toutes les interactions IA (Génération, Mode Chat, Analyse Vision) transitent exclusivement par une **Gateway API interne standardisée**. Cette passerelle agit comme un bouclier qui sanitise les requêtes, gère l'authentification et distribue la charge, assurant que les données du client ne sortent jamais du périmètre de contrôle de l'entreprise.

**10.2 Architecture Découplée et Réutilisation des Actifs**
LOTO-AI ne réinvente pas la roue. Il exploite l'architecture existante de manière chirurgicale :

* **Backend Standard :** Utilisation des routes API standards existantes pour le CRUD (Create, Read, Update, Delete) et le stockage des objets JSON.
* **Séparation des Canaux :** L'Application Mobile native gère la lourdeur du terrain (Offline, Caméra). L'Application Web (Responsive) gère la complexité de l'édition.

**10.3 Stratégie de Prompting et Traçabilité**
La spécificité réside dans les instructions système envoyées à l'IA via la Gateway. Le prompt inclut le Schéma JSON strict, les normes (RSST), la logique Miroir, et la requête utilisateur. La **Traçabilité des sources** est native : chaque champ rempli peut être retracé à sa source (photo/audio) originale.

**Conclusion Technique :**
En capitalisant sur l'infrastructure découplée et une API Gateway Interne robuste, nous réduisons le risque technique drastiquement tout en garantissant un niveau de sécurité "Enterprise-Grade" dès le jour 1.