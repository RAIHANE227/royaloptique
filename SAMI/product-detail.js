document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const productName = urlParams.get('product');
    const categoryParam = urlParams.get('category') || 'lunettes';

    const productsData = {
        'Prestige Noir': {
            image: 'assets/IMG/Luxury_tortoiseshell_eyeglasses_2eef655f.png',
            name: 'Prestige Noir',
            category: 'lunettes',
            description: 'Découvrez l\'élégance intemporelle avec notre modèle Prestige Noir. Ces lunettes en acétate noir incarnent le raffinement absolu, alliant design classique et modernité. Chaque détail est pensé pour offrir un confort optimal tout en affirmant votre style. Parfaites pour toutes les occasions, ces montures apportent une touche de sophistication à votre look quotidien.',
            features: [
                'Monture en acétate premium ultra-résistant',
                'Finition mate haut de gamme',
                'Charnières flexibles pour un ajustement parfait',
                'Protection UV 100%',
                'Compatible avec verres progressifs et médicaux',
                'Étui de luxe inclus'
            ],
            specs: {
                'Matériau': 'Acétate Premium',
                'Couleur': 'Noir Profond',
                'Style': 'Classique Intemporel',
                'Genre': 'Unisexe',
                'Taille': 'Moyenne à Large',
                'Protection': 'UV 100%'
            }
        },
        'Élégance Dorée': {
            image: 'attached_assets/generated_images/Vintage_gold_round_eyeglasses_d0fcb523.png',
            name: 'Élégance Dorée',
            category: 'lunettes',
            description: 'L\'Élégance Dorée représente le summum du luxe optique. Sa monture en métal doré finement travaillée capture la lumière avec subtilité, créant un effet visuel raffiné. Ce modèle est conçu pour ceux qui recherchent l\'excellence et ne font aucun compromis sur la qualité. Les détails dorés ajoutent une dimension prestigieuse à votre image.',
            features: [
                'Métal doré plaqué 18 carats',
                'Légèreté exceptionnelle malgré la robustesse',
                'Plaquettes nasales ajustables en silicone',
                'Design aérien et délicat',
                'Finition anti-rayures',
                'Garantie 2 ans incluse'
            ],
            specs: {
                'Matériau': 'Métal Plaqué Or',
                'Couleur': 'Beige-Doré',
                'Style': 'Élégant Moderne',
                'Genre': 'Unisexe',
                'Taille': 'Petite à Moyenne',
                'Poids': 'Ultra-léger (18g)'
            }
        },
        'Vision Moderne': {
            image: 'assets/IMG/Premium_prescription_eyeglasses_closeup_92dacfbf.png',
            name: 'Vision Moderne',
            category: 'lunettes',
            description: 'Vision Moderne incarne le minimalisme contemporain. Conçues en titane ultra-léger, ces lunettes sont l\'alliance parfaite entre technologie et esthétique. Leur design épuré et fonctionnel convient parfaitement au rythme de vie actuel. Idéales pour les professionnels exigeants qui apprécient la simplicité et l\'efficacité.',
            features: [
                'Titane médical hypoallergénique',
                'Design minimaliste scandinave',
                'Résistance exceptionnelle aux chocs',
                'Confort toute la journée',
                'Branches flexibles à mémoire de forme',
                'Traitement anti-corrosion'
            ],
            specs: {
                'Matériau': 'Titane Médical',
                'Couleur': 'Gris Métallique',
                'Style': 'Minimaliste Moderne',
                'Genre': 'Unisexe',
                'Taille': 'Moyenne',
                'Poids': 'Extra-léger (15g)'
            }
        },
        'Luxe Aviateur': {
            image: 'assets/IMG/Luxury_aviator_sunglasses_gold_1f5b283d.png',
            name: 'Luxe Aviateur',
            category: 'lunettes',
            description: 'Le modèle Luxe Aviateur revisite un classique intemporel avec une touche de modernité. Ses verres anti-reflet de qualité supérieure et sa monture en métal premium offrent une protection optimale tout en affirmant un style audacieux. Ces lunettes sont le choix parfait pour ceux qui souhaitent allier fonctionnalité et élégance.',
            features: [
                'Verres polarisés anti-reflet',
                'Monture métal inoxydable',
                'Protection UV400',
                'Traitement hydrophobe et oléophobe',
                'Design aérodynamique',
                'Pochette microfibre incluse'
            ],
            specs: {
                'Matériau': 'Métal Inoxydable',
                'Couleur': 'Or et Noir',
                'Style': 'Aviateur Classique',
                'Genre': 'Unisexe',
                'Taille': 'Large',
                'Protection': 'UV400'
            }
        },
        'Chic Écaille': {
            image: 'assets/IMG/Cat-eye_vintage_luxury_eyeglasses_461e85c6.png',
            name: 'Chic Écaille',
            category: 'lunettes',
            description: 'Chic Écaille célèbre l\'héritage vintage avec une touche contemporaine. Le motif écaille de tortue apporte chaleur et caractère à ce modèle sophistiqué. Fabriquées en acétate italien de première qualité, ces lunettes sont un véritable statement piece qui ne passe pas inaperçu. Parfaites pour affirmer votre personnalité unique.',
            features: [
                'Acétate italien Mazzucchelli',
                'Motif écaille authentique',
                'Finition brillante luxueuse',
                'Charnières Flex garanties à vie',
                'Traitement anti-allergène',
                'Étui rigide premium'
            ],
            specs: {
                'Matériau': 'Acétate Italien',
                'Couleur': 'Écaille de Tortue',
                'Style': 'Vintage Sophistiqué',
                'Genre': 'Unisexe',
                'Taille': 'Moyenne',
                'Origine': 'Italie'
            }
        },
        'Raffinement Rond': {
            image: 'attached_assets/generated_images/Vintage_gold_round_eyeglasses_d0fcb523.png',
            name: 'Raffinement Rond',
            category: 'lunettes',
            description: 'Le Raffinement Rond est un hommage au style intellectuel et artistique. Ses formes arrondies douces créent une harmonie parfaite avec tout type de visage. L\'acétate premium avec finition mate confère à ce modèle une élégance discrète mais affirmée. Ces lunettes sont idéales pour ceux qui recherchent l\'authenticité et le caractère.',
            features: [
                'Forme ronde iconique',
                'Acétate premium mat',
                'Pont-clé renforcé',
                'Branches ergonomiques',
                'Double rivets décoratifs',
                'Nettoyant spécial inclus'
            ],
            specs: {
                'Matériau': 'Acétate Premium',
                'Couleur': 'Noir Mat',
                'Style': 'Rond Vintage',
                'Genre': 'Unisexe',
                'Taille': 'Petite à Moyenne',
                'Finition': 'Mat Premium'
            }
        },
        'Excellence Titane': {
            image: 'attached_assets/generated_images/Rimless_luxury_eyeglasses_gold_c721b750.png',
            name: 'Excellence Titane',
            category: 'lunettes',
            description: 'Excellence Titane représente le nec plus ultra de l\'ingénierie optique. Ces lunettes sans monture mettent en valeur la pureté des verres tout en offrant une légèreté incomparable. Le titane utilisé garantit une durabilité exceptionnelle. Un choix premium pour les connaisseurs qui apprécient la discrétion et la performance.',
            features: [
                'Design rimless ultra-moderne',
                'Titane aérospatial',
                'Verres haute définition',
                'Système de fixation breveté',
                'Ajustement personnalisable',
                'Certificat d\'authenticité inclus'
            ],
            specs: {
                'Matériau': 'Titane Aérospatial',
                'Couleur': 'Or Rose',
                'Style': 'Sans Monture',
                'Genre': 'Unisexe',
                'Taille': 'Ajustable',
                'Poids': 'Ultra-léger (12g)'
            }
        },
        'Style Carré': {
            image: 'attached_assets/generated_images/Square_black_designer_eyeglasses_fc332592.png',
            name: 'Style Carré',
            category: 'lunettes',
            description: 'Style Carré est synonyme de modernité et d\'audace. Ses lignes géométriques affirmées créent un look contemporain et décidé. L\'acétate épais offre une présence visuelle forte tout en restant confortable. Ces lunettes sont parfaites pour ceux qui veulent se démarquer avec confiance et élégance.',
            features: [
                'Forme carrée architecturale',
                'Acétate épais premium',
                'Verres grands formats',
                'Charnières allemandes',
                'Design statement',
                'Kit d\'entretien complet'
            ],
            specs: {
                'Matériau': 'Acétate Épais',
                'Couleur': 'Noir Profond',
                'Style': 'Carré Moderne',
                'Genre': 'Unisexe',
                'Taille': 'Large',
                'Épaisseur': 'Premium (5mm)'
            }
        },
        'Soleil Premium': {
            image: 'assets/IMG/Premium_polarized_black_sunglasses_8bbcd9f0.png',
            name: 'Soleil Premium',
            category: 'lunettes',
            description: 'Les lunettes Soleil Premium combinent protection maximale et style irréprochable. Leurs verres polarisés éliminent les reflets gênants pour une vision parfaite. La monture sportive-chic s\'adapte à toutes vos activités. Un accessoire indispensable pour les journées ensoleillées en toute élégance.',
            features: [
                'Verres polarisés Catégorie 3',
                'Monture sport-luxe',
                'Protection latérale renforcée',
                'Traitement anti-buée',
                'Flottabilité pour sports nautiques',
                'Cordon ajustable premium inclus'
            ],
            specs: {
                'Matériau': 'Composite Advanced',
                'Couleur': 'Noir Mat',
                'Style': 'Sport Chic',
                'Genre': 'Unisexe',
                'Taille': 'Large',
                'Protection': 'Polarisé UV400'
            }
        }
    };

    const categoryNames = {
        'lunettes': 'Lunettes',
        'verres': 'Verres Médicaux',
        'lentilles': 'Lentilles'
    };

    const categoryLinks = {
        'lunettes': 'lunettes.html',
        'verres': 'verres.html',
        'lentilles': 'lentilles.html'
    };

    if (!productName) {
        window.location.href = 'index.html';
        return;
    }

    const product = productsData[productName];
    if (!product) {
        window.location.href = 'index.html';
        return;
    }

    document.getElementById('detailProductImage').src = product.image;
    document.getElementById('detailProductName').textContent = product.name;
    document.getElementById('detailProductDescription').textContent = product.description;
    document.title = `${product.name} - Royal Optique Médicale`;

    const featuresUl = document.getElementById('detailProductFeatures');
    featuresUl.innerHTML = '';
    product.features.forEach(feature => {
        const li = document.createElement('li');
        li.textContent = feature;
        featuresUl.appendChild(li);
    });

    const specsDiv = document.getElementById('detailProductSpecs');
    specsDiv.innerHTML = '';
    Object.entries(product.specs).forEach(([label, value]) => {
        const specItem = document.createElement('div');
        specItem.className = 'spec-item';
        specItem.innerHTML = `
            <div class="spec-label">${label}</div>
            <div class="spec-value">${value}</div>
        `;
        specsDiv.appendChild(specItem);
    });

    const breadcrumbCategory = document.getElementById('breadcrumbCategory');
    breadcrumbCategory.textContent = categoryNames[categoryParam] || 'Produits';
    breadcrumbCategory.href = categoryLinks[categoryParam] || 'index.html';

    document.getElementById('breadcrumbProduct').textContent = product.name;

    const backLink = document.getElementById('backToCategory');
    backLink.href = categoryLinks[categoryParam] || 'index.html';
    backLink.textContent = `← Retour à ${categoryNames[categoryParam] || 'la collection'}`;

    const requestBtn = document.querySelector('.detail-request-btn');
    if (requestBtn) {
        requestBtn.addEventListener('click', function() {
            if (typeof showNotification === 'function') {
                showNotification(`Demande envoyée pour ${product.name} - Nous vous contacterons bientôt!`);
            }
            setTimeout(() => {
                window.location.href = 'commande.html';
            }, 1500);
        });
    }
});
