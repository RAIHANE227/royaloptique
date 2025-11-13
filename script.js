document.addEventListener('DOMContentLoaded', function() {
    // Countdown Timer for Special Offers
    function updateCountdown() {
        // Set the date we're counting down to (7 days from now)
        const countDownDate = new Date();
        countDownDate.setDate(countDownDate.getDate() + 7);
        
        // Update the countdown every 1 second
        const x = setInterval(function() {
            // Get today's date and time
            const now = new Date().getTime();
            
            // Find the distance between now and the countdown date
            const distance = countDownDate - now;
            
            // Time calculations for days, hours, minutes and seconds
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            // Display the result
            const daysElement = document.getElementById('days');
            const hoursElement = document.getElementById('hours');
            const minutesElement = document.getElementById('minutes');
            const secondsElement = document.getElementById('seconds');
            
            if (daysElement) daysElement.textContent = days.toString().padStart(2, '0');
            if (hoursElement) hoursElement.textContent = hours.toString().padStart(2, '0');
            if (minutesElement) minutesElement.textContent = minutes.toString().padStart(2, '0');
            if (secondsElement) secondsElement.textContent = seconds.toString().padStart(2, '0');
            
            // If the countdown is finished, clear interval
            if (distance < 0) {
                clearInterval(x);
                const countdownContainer = document.querySelector('.countdown-container');
                if (countdownContainer) {
                    countdownContainer.innerHTML = '<div class="offer-ended">L\'offre est terminée!</div>';
                }
            }
        }, 1000);
    }
    
    // Initialize countdown if the elements exist
    if (document.getElementById('days')) {
        updateCountdown();
    }
    
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navbar = document.getElementById('navbar');
    let cartCount = 0;

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    const sliderContainer = document.querySelector('.slider-container');
    if (sliderContainer) {
        const slides = document.querySelectorAll('.slide');
        const dotsContainer = document.querySelector('.slider-dots');
        let currentSlide = 0;

        slides.forEach((slide, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });

        const dots = document.querySelectorAll('.dot');

        function goToSlide(n) {
            slides[currentSlide].classList.remove('active');
            dots[currentSlide].classList.remove('active');
            currentSlide = (n + slides.length) % slides.length;
            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
        }

        function nextSlide() {
            goToSlide(currentSlide + 1);
        }

        function prevSlide() {
            goToSlide(currentSlide - 1);
        }

        const nextBtn = document.querySelector('.slider-btn.next');
        const prevBtn = document.querySelector('.slider-btn.prev');
        
        if (nextBtn) nextBtn.addEventListener('click', nextSlide);
        if (prevBtn) prevBtn.addEventListener('click', prevSlide);

        setInterval(nextSlide, 5000);
    }

    const scrollRevealElements = document.querySelectorAll('.scroll-reveal');

    function checkScroll() {
        scrollRevealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            
            if (elementTop < window.innerHeight - 100 && elementBottom > 0) {
                element.classList.add('revealed');
            }
        });
    }

    window.addEventListener('scroll', checkScroll);
    checkScroll();

    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const productName = this.getAttribute('data-product');
            
            cartCount++;
            const cartCountElement = document.querySelector('.cart-count');
            if (cartCountElement) {
                cartCountElement.textContent = cartCount;
                
                cartCountElement.style.animation = 'none';
                setTimeout(() => {
                    cartCountElement.style.animation = 'bounceIn 0.5s ease';
                }, 10);
            }

            const cartIcon = document.querySelector('.cart-icon');
            if (cartIcon) {
                cartIcon.style.animation = 'none';
                setTimeout(() => {
                    cartIcon.style.animation = 'pulse 0.5s ease';
                }, 10);
            }

            showNotification(`${productName} ajouté à votre sélection`);
        });
    });

    function showNotification(message) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: linear-gradient(135deg, #c9a961, #b8954d);
            color: white;
            padding: 1rem 2rem;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            z-index: 10000;
            animation: slideInRight 0.5s ease, slideOutRight 0.5s ease 2.5s;
            font-family: 'Poppins', sans-serif;
        `;
        notification.textContent = message;
        document.body.appendChild(notification);

        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(400px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(400px);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);

        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    const orderForm = document.getElementById('orderForm');
    const confirmationMessage = document.getElementById('confirmationMessage');

    if (orderForm && confirmationMessage) {
        orderForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const formInputs = orderForm.querySelectorAll('input, select, textarea');
            let isValid = true;

            formInputs.forEach(input => {
                if (input.hasAttribute('required') && !input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = 'red';
                    setTimeout(() => {
                        input.style.borderColor = '';
                    }, 2000);
                }
            });

            if (isValid) {
                orderForm.style.display = 'none';
                confirmationMessage.style.display = 'block';

                setTimeout(() => {
                    window.scrollTo({
                        top: confirmationMessage.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }, 100);
            } else {
                showNotification('Veuillez remplir tous les champs obligatoires');
            }
        });
    }

    window.resetForm = function() {
        if (orderForm && confirmationMessage) {
            orderForm.reset();
            orderForm.style.display = 'block';
            confirmationMessage.style.display = 'none';
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    };

    const authTabs = document.querySelectorAll('.auth-tab');
    const authForms = document.querySelectorAll('.auth-form');

    authTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');

            authTabs.forEach(t => t.classList.remove('active'));
            authForms.forEach(f => f.classList.remove('active'));

            this.classList.add('active');
            document.getElementById(targetTab + 'Form').classList.add('active');
        });
    });

    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    if (loginForm) {
        const form = loginForm.querySelector('form');
        if (form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                showNotification('Fonctionnalité de démonstration - Connexion simulée');
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 2000);
            });
        }
    }

    if (registerForm) {
        const form = registerForm.querySelector('form');
        if (form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                const password = document.getElementById('registerPassword').value;
                const confirmPassword = document.getElementById('registerConfirmPassword').value;

                if (password !== confirmPassword) {
                    showNotification('Les mots de passe ne correspondent pas');
                    return;
                }

                showNotification('Fonctionnalité de démonstration - Inscription simulée');
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 2000);
            });
        }
    }

    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });

    document.querySelectorAll('input[type="file"]').forEach(input => {
        input.addEventListener('change', function() {
            const fileName = this.files[0]?.name;
            if (fileName) {
                showNotification(`Fichier sélectionné: ${fileName}`);
            }
        });
    });

    const parallaxSections = document.querySelectorAll('.hero-slider');
    window.addEventListener('scroll', function() {
        parallaxSections.forEach(section => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.5;
            section.style.transform = `translate3d(0, ${rate}px, 0)`;
        });
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX / window.innerWidth - 0.5;
        mouseY = e.clientY / window.innerHeight - 0.5;
    });

    function animateCards() {
        document.querySelectorAll('.product-card, .category-card').forEach(card => {
            const rect = card.getBoundingClientRect();
            const cardX = rect.left + rect.width / 2;
            const cardY = rect.top + rect.height / 2;
            
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const deltaX = (mouseX * 20);
                const deltaY = (mouseY * 20);
                card.style.transform = `perspective(1000px) rotateY(${deltaX * 0.05}deg) rotateX(${-deltaY * 0.05}deg)`;
            }
        });
        requestAnimationFrame(animateCards);
    }

    animateCards();

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeIn 0.8s ease forwards';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.info-card, .category-card, .product-card').forEach(element => {
        observer.observe(element);
    });

    const productsData = {
        'Prestige Noir': {
            image: 'attached_assets/generated_images/Luxury_tortoiseshell_eyeglasses_2eef655f.png',
            name: 'Prestige Noir',
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
            image: 'attached_assets/generated_images/Minimalist_black_metal_eyeglasses_f29b8e3d.png',
            name: 'Vision Moderne',
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
            image: 'attached_assets/generated_images/Luxury_aviator_sunglasses_gold_1f5b283d.png',
            name: 'Luxe Aviateur',
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
            image: 'attached_assets/generated_images/Cat-eye_vintage_luxury_eyeglasses_461e85c6.png',
            name: 'Chic Écaille',
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
            image: 'attached_assets/generated_images/Premium_polarized_black_sunglasses_8bbcd9f0.png',
            name: 'Soleil Premium',
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

    const modal = document.getElementById('productModal');
    const modalClose = document.querySelector('.modal-close');
    const modalOverlay = document.querySelector('.modal-overlay');

    function openProductModal(productName) {
        const product = productsData[productName];
        if (!product) {
            console.log('Product not found:', productName);
            return;
        }

        document.getElementById('modalProductImage').src = product.image;
        document.getElementById('modalProductName').textContent = product.name;
        document.getElementById('modalProductDescription').textContent = product.description;

        const featuresUl = document.getElementById('modalProductFeatures');
        featuresUl.innerHTML = '';
        product.features.forEach(feature => {
            const li = document.createElement('li');
            li.textContent = feature;
            featuresUl.appendChild(li);
        });

        const specsDiv = document.getElementById('modalProductSpecs');
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

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeProductModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (modalClose) {
        modalClose.addEventListener('click', closeProductModal);
    }

    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeProductModal);
    }

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
            closeProductModal();
        }
    });

    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('click', function(e) {
            if (e.target.classList.contains('add-to-cart')) {
                e.preventDefault();
                const productName = e.target.getAttribute('data-product');
                openProductModal(productName);
            }
        });
    });

    const modalRequestBtn = document.querySelector('.modal-request-btn');
    if (modalRequestBtn) {
        modalRequestBtn.addEventListener('click', function() {
            const productName = document.getElementById('modalProductName').textContent;
            showNotification(`Demande envoyée pour ${productName} - Nous vous contacterons bientôt!`);
            setTimeout(() => {
                closeProductModal();
            }, 1500);
        });
    }

    console.log('🌟 Royal Optique Médicale - Site web chargé avec succès!');
});
