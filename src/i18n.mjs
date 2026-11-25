// All site copy. Text in [square brackets] is a placeholder to fill in before launch.
export const LANGS = ['en', 'es', 'ja'];

export const T = {
  en: {
    htmlLang: 'en', locale: 'en-IE', langName: 'English',
    brand: 'Matane Jewellery',
    nav: { collection: 'Shop', story: 'The knot', about: 'About', size: 'Size guide', bag: 'Bag' },
    footer: { shipping: 'Shipping & returns', contact: 'Contact', legal: 'Legal & privacy', designed: 'Designed in Barcelona', rights: 'All rights reserved.' },
    previewBanner: 'Preview: prices are placeholders and checkout runs in Stripe test mode.',
    skip: 'Skip to content',
    home: {
      title: 'Matane Jewellery — Japanese knot jewellery in silver, gold and platinum',
      desc: 'Rings, pendants, bracelets and earrings shaped by Japanese knots and cords, cast to order in silver, 14K and 18K gold, and platinum.',
      vertical: '水引玉',
      h1: 'A knot that holds.',
      wornH: 'Worn close', wornP: 'Every pendant and bracelet comes on a fine cable chain in the same metal.',
      flagCta: 'Discover Mizuhiki Tama', allCta: 'Shop all',
      flagP: 'Our flagship: a ball of woven cords, 10 mm across, in sterling silver, 14K or 18K white and yellow gold, or platinum. Every piece is cast to order.',
      lede: 'Rings, pendants, bracelets and earrings shaped by Japanese knots and cords, cast in silver, gold and platinum.',
      cta: 'Shop the collections',
      collH: 'Collections',
      collP: 'Each collection takes its shape from a Japanese cord or knot. Every piece is cast to order in your choice of metal.',
      from: 'From',
      storyH: 'Tied so it won’t come undone',
      storyP: 'In mizuhiki, the paper cords that tie Japanese gifts, the plum knot is pulled tight so it cannot be untied. That is why it is tied for lasting bonds and good fortune. We drew each cord as a polished wire, so the knot keeps its meaning in metal.',
      storyLink: 'Read the story',
      facts: [
        ['Made to order', 'Cast for you and ready to ship in {lead} weeks.'],
        ['Six precious metals', 'Sterling silver, 14K and 18K white or yellow gold, or platinum 950.'],
        ['Free insured shipping', 'Delivered in a gift box, fully insured.']
      ]
    },
    collection: {
      title: 'Shop — Matane Jewellery',
      desc: 'Rings, pendants, bracelets and earrings from the Ume Musubi, Awaji Musubi and Shimenawa collections, in silver, 14K and 18K gold, and platinum.',
      h1: 'Shop',
      lede: 'Every piece is cast to order in your choice of six metals: sterling silver, 14K or 18K white and yellow gold, or platinum 950.',
      metals: '3 metals',
      count: '{n} pieces', countOne: '1 piece'
    },
    product: {
      metal: 'Metal',
      size: 'Ring size (EU)',
      choose: 'Choose your size',
      sizeGuide: 'Size guide',
      add: 'Add to bag',
      added: 'Added to bag',
      viewBag: 'View bag',
      needSize: 'Choose a ring size to continue.',
      made: 'Made to order. Ready to ship in {lead} weeks.',
      ship: 'Free insured shipping in a gift box.',
      details: 'Details',
      photos: 'Photos',
      view3d: '3D',
      drag: 'Drag to turn the piece. Pinch or scroll to zoom.',
      wornAlt: '{name} shown on a linen display form, on a fine cable chain',
      about: {
        ring: 'The plum-blossom knot sits on a band of three fine wires, the same three cords that form the knot. Polished to a mirror finish, it catches light from every angle of the woven petals.',
        pendant: 'Five petals of triple cord, woven over and under like a real mizuhiki knot and hung from a polished bail. Chain sold separately.'
      },
      alt: '{name} in {metal}, {view} view',
      viewsName: { hero: 'three-quarter', top: 'top', side: 'side', front: 'front', flat: 'angled', cord: 'red-cord', macro: 'close-up' }
    },
    story: {
      title: 'The story of the plum knot — Matane Jewellery',
      desc: 'Ume musubi, the plum-blossom knot of Japanese mizuhiki, and how we cast it in metal.',
      h1: 'The plum knot',
      sections: [
        ['Mizuhiki', 'Mizuhiki are stiff paper cords used in Japan to tie gifts and envelopes. The knot is part of the message: some are tied as bows that can be undone and tied again, others are pulled tight for things that should happen once and last.'],
        ['Ume musubi', 'The ume musubi takes the shape of a plum blossom. It is tied tightly and is difficult to undo, so it has come to stand for strong bonds, good fortune and protection.'],
        ['The plum blossom', 'Ume blooms at the end of winter, before almost anything else. With pine and bamboo it is one of the three “friends of winter” (shō-chiku-bai), a long-standing sign of good luck and resilience.'],
        ['From cord to metal', 'We kept the three cords of the knot as three polished wires and followed every crossing over and under. Each piece is cast to order in silver, gold or platinum, then finished by hand.']
      ],
      cta: 'See the collection'
    },
    size: {
      title: 'Ring size guide — Matane Jewellery',
      desc: 'Find your ring size in EU, US and Japanese sizing.',
      h1: 'Ring size guide',
      lede: 'Our sizes follow the EU system: the size is the inside circumference of the ring in millimetres.',
      howH: 'Measure at home',
      how: [
        'Wrap a thin strip of paper around the base of your finger.',
        'Mark where the paper overlaps and measure the length in millimetres.',
        'That number is your EU size. Between two sizes, choose the larger one.'
      ],
      tip: 'Measure at the end of the day when your fingers are warm, and check the strip slides over your knuckle.',
      th: ['EU', 'Circumference', 'US', 'Japan'],
      approx: 'US and Japanese sizes are approximate conversions.',
      help: 'Not sure? Write to us and we’ll help you choose.'
    },
    shipping: {
      title: 'Shipping & returns — Matane Jewellery',
      desc: 'Lead times, shipping and returns for made-to-order pieces.',
      h1: 'Shipping & returns',
      sections: [
        ['Made to order', 'Every piece is cast after you order. Your piece will be ready to ship in {lead} weeks. We’ll email you when it leaves our workshop.'],
        ['Shipping', 'Shipping is free and fully insured. Delivery takes [2–5] working days within Spain and the EU and [5–10] working days elsewhere. Orders outside the EU may be subject to import duties and taxes payable on delivery.'],
        ['Returns', 'You can return an order within 14 days of delivery for a refund, as long as the piece is unworn and in its original packaging. [Confirm with your legal adviser whether pieces made to a specific ring size are excluded from the right of withdrawal.] Write to us to arrange a return.'],
        ['Resizing', '[If your ring doesn’t fit, we can resize it once free of charge within 30 days of delivery.]']
      ]
    },
    contact: {
      title: 'Contact — Matane Jewellery',
      desc: 'Questions about a piece, sizing or an order.',
      h1: 'Contact',
      lede: 'Questions about a piece, a size or your order? Send us a message and we’ll reply within two working days.',
      email: 'Email',
      name: 'Name', emailField: 'Email', order: 'Order number (optional)', message: 'Message', send: 'Send message',
      sent: 'Message sent. We’ll reply within two working days.'
    },
    legal: {
      title: 'Legal notice & privacy — Matane Jewellery',
      desc: 'Legal notice, terms of sale, privacy and cookies.',
      h1: 'Legal notice & privacy',
      draft: 'Template: complete the details in brackets and have this page reviewed before launch.',
      sections: [
        ['Legal notice', 'This website is operated by [business name], [NIF/NIE], [address], [email]. '],
        ['Terms of sale', 'Prices are in euros and include VAT. A contract is formed when your payment is confirmed. Pieces are made to order and shipped within the lead time shown on each product. Payments are processed securely by Stripe; we never see or store your card details.'],
        ['Privacy', 'We use your name, email, phone and address only to make, ship and support your order. Order data is stored with Supabase (servers in Frankfurt, EU) and payments are handled by Stripe. You can ask to access, correct or delete your data at [email].'],
        ['Cookies', 'This site does not use advertising or analytics cookies. Your bag is kept in your browser’s local storage so it is still there when you come back.']
      ]
    },
    bag: {
      title: 'Your bag — Matane Jewellery',
      h1: 'Your bag',
      empty: 'Your bag is empty.',
      emptyCta: 'Browse the collection',
      size: 'Size',
      qty: 'Quantity',
      remove: 'Remove',
      subtotal: 'Subtotal',
      shipping: 'Shipping',
      free: 'Free',
      total: 'Total',
      vat: 'VAT included.',
      checkout: 'Checkout',
      redirect: 'Opening secure checkout…',
      error: 'Checkout couldn’t start. Check your connection and try again.',
      previewOnly: 'Checkout works once the site is deployed with your Stripe keys.',
      made: 'Made to order. Ready to ship in {lead} weeks.'
    },
    thanks: {
      title: 'Thank you — Matane Jewellery',
      h1: 'Thank you for your order',
      p: 'Your payment is confirmed and we’ve sent a receipt to your email. We’ll start making your piece now and write again when it ships.',
      cta: 'Back to the collection'
    },
    about: {
      title: 'About us — Matané Jewellery',
      desc: 'Matané began with two stories, one in Tokyo and one in Barcelona. Jewellery that holds the beauty of nature in a small world.',
      h1: 'About Matané',
      name: 'The name Matané comes from Japanese. Unlike “sayonara”, it carries a different feeling:',
      line: 'また逢おう、また逢いたい。',
      lineT: 'See you again. I want to see you again.',
      cityA: 'Tokyo', cityB: 'Barcelona',
      two: 'Matané began with two stories: one in Tokyo, one in Barcelona.',
      story: [
        'Our founder, Suzuki, grew close to the man who is now her husband across the distance between Tokyo and Barcelona. For several years they travelled back and forth, saying “matané” to each other at every parting.',
        'Even when we were apart, the sun rose to the same rhythm every day, and every night the moon came out. We lived far away from each other, yet we were looking at the same things.',
        'Knowing that kept us going.',
        'Today we have made Barcelona our home, and we live in the same place.'
      ],
      natureH: 'Nature, in a small world',
      nature: [
        'Matané is a jewellery brand that holds the beauty nature creates within a small world. Every one of our designs is inspired by the natural world.',
        'Just as no two landscapes in nature are ever the same, each Matané piece has its own character and a design all of its own.'
      ],
      miracle: 'The miracle of meeting in this endless world.',
      ask: 'Is there someone you want to say matané to?',
      cta: 'View the collection'
    },
    metals: {
      title: 'Our metals — Matane Jewellery',
      desc: 'Sterling silver, 14K and 18K gold in white or yellow, and platinum 950: how they differ and how to care for them.',
      h1: 'Six metals',
      lede: 'Every piece is cast to order in the metal you choose. Here is how they differ.',
      homeH: 'Choose your metal',
      homeP: 'Every design is available in six metals, from sterling silver to platinum.',
      homeLink: 'Compare the metals',
      link: 'About the metals',
      items: {
        ag: ['92.5% silver. A bright, cool white and the lightest way into the collection. Silver softens and can darken a little over time; a polishing cloth brings back the shine.'],
        wg: ['58.5% gold, alloyed for strength and finished with a bright rhodium plating. Hard-wearing, ideal for rings and pieces you wear every day.'],
        yg: ['58.5% gold. A soft, warm yellow and a durable choice for everyday wear.'],
        wg18: ['75% gold, finished with rhodium plating for a bright white surface. More gold than 14K, with the same luminous look.'],
        yg18: ['75% gold. A deeper, richer yellow, the classic colour of fine Japanese and European jewellery.'],
        pt: ['95% platinum. Naturally white, dense and heavy in the hand. It doesn’t fade or need plating, and it suits sensitive skin.']
      },
      care: 'White gold is rhodium-plated. Depending on wear, a fresh plating every few years keeps it bright; we can do it for you.'
    },
    legalMeta: { updated: 'Last updated', legal: 'Legal notice', terms: 'Terms of sale', privacy: 'Privacy', cookies: 'Cookies', termsLower: 'terms of sale', privacyLower: 'privacy policy',
      accept: 'I have read and accept the {terms}, including the 14-day right of withdrawal, and the {privacy}.', mustAccept: 'Please accept the terms of sale to continue.',
      contactNote: 'We use your details only to answer you. See our {privacy}.' },
    order: { title: 'Your order — Matane Jewellery', h1: 'Your order', loading: 'Loading your order…', notFound: 'We couldn’t find this order. Check the link in your confirmation email, or write to us.',
      number: 'Order', date: 'Placed', total: 'Total', tracking: 'Tracking', steps: { paid: 'Paid', in_production: 'In the workshop', shipped: 'Shipped', delivered: 'Delivered' },
      intro: { paid: 'Thank you. Your order is confirmed and goes to the workshop shortly.', in_production: 'Your piece is being made in our workshop.', shipped: 'Your order is on its way.', delivered: 'Your order has been delivered.', refunded: 'This order was refunded.', cancelled: 'This order was cancelled.' } },
    notFound: { title: 'Page not found — Matane Jewellery', h1: 'Page not found', p: 'This page doesn’t exist. Try the collection instead.', cta: 'View the collection' }
  },

  es: {
    htmlLang: 'es', locale: 'es-ES', langName: 'Español',
    brand: 'Matane Jewellery',
    nav: { collection: 'Tienda', story: 'El nudo', about: 'Nosotros', size: 'Guía de tallas', bag: 'Cesta' },
    footer: { shipping: 'Envíos y devoluciones', contact: 'Contacto', legal: 'Aviso legal y privacidad', designed: 'Diseñado en Barcelona', rights: 'Todos los derechos reservados.' },
    previewBanner: 'Vista previa: los precios son provisionales y el pago funciona en modo de prueba de Stripe.',
    skip: 'Ir al contenido',
    home: {
      title: 'Matane Jewellery — Joyas de nudos japoneses en plata, oro y platino',
      desc: 'Anillos, colgantes, pulseras y pendientes inspirados en nudos y cordones japoneses, fundidos por encargo en plata, oro de 14K y 18K, y platino.',
      vertical: '水引玉',
      h1: 'Un nudo que no se deshace.',
      wornH: 'De cerca', wornP: 'Cada colgante y pulsera se entrega con una fina cadena forzada del mismo metal.',
      flagCta: 'Descubrir Mizuhiki Tama', allCta: 'Ver toda la tienda',
      flagP: 'Nuestra pieza insignia: una bola de cordones entrelazados de 10 mm, en plata de ley, oro blanco o amarillo de 14K o 18K, o platino. Cada pieza se funde por encargo.',
      lede: 'Anillos, colgantes, pulseras y pendientes inspirados en nudos y cordones japoneses, en plata, oro y platino.',
      cta: 'Ver las colecciones',
      collH: 'Colecciones',
      collP: 'Cada colección toma su forma de un cordón o un nudo japonés. Cada pieza se funde por encargo en el metal que elijas.',
      from: 'Desde',
      storyH: 'Atado para no deshacerse',
      storyP: 'En el mizuhiki, los cordones de papel con los que se atan los regalos en Japón, el nudo de ciruelo se aprieta tanto que no se puede desatar. Por eso se ata para los lazos duraderos y la buena fortuna. Hemos convertido cada cordón en un hilo pulido para que el nudo conserve su significado en metal.',
      storyLink: 'Leer la historia',
      facts: [
        ['Hecho por encargo', 'Fundido para ti y listo para enviar en {lead} semanas.'],
        ['Seis metales preciosos', 'Plata de ley, oro blanco o amarillo de 14K y 18K, o platino 950.'],
        ['Envío asegurado gratuito', 'En caja de regalo y totalmente asegurado.']
      ]
    },
    collection: {
      title: 'Tienda — Matane Jewellery',
      desc: 'Anillos, colgantes, pulseras y pendientes de las colecciones Ume Musubi, Awaji Musubi y Shimenawa, en plata, oro de 14K y 18K, y platino.',
      h1: 'Tienda',
      lede: 'Cada pieza se funde por encargo en el metal que elijas entre seis: plata de ley, oro blanco o amarillo de 14K o 18K, o platino 950.',
      metals: '3 metales',
      count: '{n} piezas', countOne: '1 pieza'
    },
    product: {
      metal: 'Metal',
      size: 'Talla de anillo (EU)',
      choose: 'Elige tu talla',
      sizeGuide: 'Guía de tallas',
      add: 'Añadir a la cesta',
      added: 'Añadido a la cesta',
      viewBag: 'Ver cesta',
      needSize: 'Elige una talla para continuar.',
      made: 'Hecho por encargo. Listo para enviar en {lead} semanas.',
      ship: 'Envío asegurado gratuito en caja de regalo.',
      details: 'Detalles',
      photos: 'Fotos',
      view3d: '3D',
      drag: 'Arrastra para girar la pieza. Pellizca o usa la rueda para ampliar.',
      wornAlt: '{name} sobre un busto de lino, con una fina cadena forzada',
      about: {
        ring: 'El nudo de flor de ciruelo descansa sobre un aro de tres hilos finos, los mismos tres cordones que forman el nudo. Con acabado espejo, recoge la luz en cada pétalo entrelazado.',
        pendant: 'Cinco pétalos de triple cordón que pasan por encima y por debajo como un nudo de mizuhiki real, colgados de un asa pulida. Cadena no incluida.'
      },
      alt: '{name} en {metal}, vista {view}',
      viewsName: { hero: 'tres cuartos', top: 'superior', side: 'lateral', front: 'frontal', flat: 'en ángulo', cord: 'con cordón rojo', macro: 'de detalle' }
    },
    story: {
      title: 'La historia del nudo de ciruelo — Matane Jewellery',
      desc: 'El ume musubi, el nudo de flor de ciruelo del mizuhiki japonés, y cómo lo llevamos al metal.',
      h1: 'El nudo de ciruelo',
      sections: [
        ['Mizuhiki', 'El mizuhiki son cordones de papel rígido con los que en Japón se atan regalos y sobres. El nudo forma parte del mensaje: algunos son lazos que se pueden deshacer y volver a atar; otros se aprietan para lo que debe ocurrir una sola vez y durar.'],
        ['Ume musubi', 'El ume musubi tiene forma de flor de ciruelo. Se ata con fuerza y es difícil de deshacer, por eso simboliza los lazos fuertes, la buena fortuna y la protección.'],
        ['La flor de ciruelo', 'El ciruelo florece al final del invierno, antes que casi todo lo demás. Junto al pino y el bambú es uno de los “tres amigos del invierno” (shō-chiku-bai), símbolo tradicional de buena suerte y resistencia.'],
        ['Del cordón al metal', 'Hemos mantenido los tres cordones del nudo como tres hilos pulidos y seguido cada cruce por encima y por debajo. Cada pieza se funde por encargo en plata, oro o platino y se termina a mano.']
      ],
      cta: 'Ver la colección'
    },
    size: {
      title: 'Guía de tallas de anillo — Matane Jewellery',
      desc: 'Encuentra tu talla de anillo en sistema europeo, estadounidense y japonés.',
      h1: 'Guía de tallas',
      lede: 'Nuestras tallas siguen el sistema europeo: la talla es la circunferencia interior del anillo en milímetros.',
      howH: 'Mídela en casa',
      how: [
        'Rodea la base del dedo con una tira fina de papel.',
        'Marca donde se superpone el papel y mide la longitud en milímetros.',
        'Ese número es tu talla europea. Si estás entre dos tallas, elige la mayor.'
      ],
      tip: 'Mide al final del día, con los dedos calientes, y comprueba que la tira pasa por el nudillo.',
      th: ['EU', 'Circunferencia', 'EE. UU.', 'Japón'],
      approx: 'Las tallas de EE. UU. y Japón son conversiones aproximadas.',
      help: '¿Tienes dudas? Escríbenos y te ayudamos a elegir.'
    },
    shipping: {
      title: 'Envíos y devoluciones — Matane Jewellery',
      desc: 'Plazos, envíos y devoluciones de las piezas hechas por encargo.',
      h1: 'Envíos y devoluciones',
      sections: [
        ['Hecho por encargo', 'Cada pieza se funde después de tu pedido. Estará lista para enviar en {lead} semanas. Te avisaremos por email cuando salga del taller.'],
        ['Envío', 'El envío es gratuito y está totalmente asegurado. La entrega tarda [2–5] días laborables en España y la UE y [5–10] días laborables en el resto del mundo. Los pedidos fuera de la UE pueden estar sujetos a aranceles e impuestos de importación que se pagan en la entrega.'],
        ['Devoluciones', 'Puedes devolver un pedido en los 14 días siguientes a la entrega y recibir el reembolso, siempre que la pieza no se haya usado y esté en su embalaje original. [Confirma con tu asesor legal si las piezas hechas a una talla concreta quedan excluidas del derecho de desistimiento.] Escríbenos para organizar la devolución.'],
        ['Cambio de talla', '[Si el anillo no te queda bien, lo ajustamos una vez sin coste en los 30 días siguientes a la entrega.]']
      ]
    },
    contact: {
      title: 'Contacto — Matane Jewellery',
      desc: 'Preguntas sobre una pieza, una talla o un pedido.',
      h1: 'Contacto',
      lede: '¿Tienes preguntas sobre una pieza, una talla o tu pedido? Envíanos un mensaje y te responderemos en dos días laborables.',
      email: 'Email',
      name: 'Nombre', emailField: 'Email', order: 'Número de pedido (opcional)', message: 'Mensaje', send: 'Enviar mensaje',
      sent: 'Mensaje enviado. Te responderemos en dos días laborables.'
    },
    legal: {
      title: 'Aviso legal y privacidad — Matane Jewellery',
      desc: 'Aviso legal, condiciones de venta, privacidad y cookies.',
      h1: 'Aviso legal y privacidad',
      draft: 'Plantilla: completa los datos entre corchetes y haz revisar esta página antes del lanzamiento.',
      sections: [
        ['Aviso legal', 'En cumplimiento de la LSSI-CE, este sitio web pertenece a [nombre o razón social], [NIF/NIE], con domicilio en [dirección] y email [email].'],
        ['Condiciones de venta', 'Los precios están en euros e incluyen el IVA. El contrato se perfecciona cuando se confirma el pago. Las piezas se fabrican por encargo y se envían en el plazo indicado en cada producto. Los pagos se procesan de forma segura con Stripe; nunca vemos ni guardamos los datos de tu tarjeta.'],
        ['Privacidad', 'Usamos tu nombre, email, teléfono y dirección solo para fabricar, enviar y atender tu pedido. Los datos de los pedidos se guardan en Supabase (servidores en Fráncfort, UE) y los pagos los gestiona Stripe. Puedes solicitar el acceso, la rectificación o la supresión de tus datos en [email].'],
        ['Cookies', 'Este sitio no usa cookies de publicidad ni de analítica. Tu cesta se guarda en el almacenamiento local de tu navegador para que siga ahí cuando vuelvas.']
      ]
    },
    bag: {
      title: 'Tu cesta — Matane Jewellery',
      h1: 'Tu cesta',
      empty: 'Tu cesta está vacía.',
      emptyCta: 'Ver la colección',
      size: 'Talla',
      qty: 'Cantidad',
      remove: 'Eliminar',
      subtotal: 'Subtotal',
      shipping: 'Envío',
      free: 'Gratis',
      total: 'Total',
      vat: 'IVA incluido.',
      checkout: 'Finalizar compra',
      redirect: 'Abriendo el pago seguro…',
      error: 'No se ha podido iniciar el pago. Comprueba tu conexión y vuelve a intentarlo.',
      previewOnly: 'El pago funcionará cuando el sitio esté publicado con tus claves de Stripe.',
      made: 'Hecho por encargo. Listo para enviar en {lead} semanas.'
    },
    thanks: {
      title: 'Gracias — Matane Jewellery',
      h1: 'Gracias por tu pedido',
      p: 'Tu pago está confirmado y te hemos enviado el recibo por email. Empezamos a hacer tu pieza y te escribiremos cuando la enviemos.',
      cta: 'Volver a la colección'
    },
    about: {
      title: 'Nosotros — Matané Jewellery',
      desc: 'Matané nació de dos historias, una en Tokio y otra en Barcelona. Joyas que encierran la belleza de la naturaleza en un pequeño mundo.',
      h1: 'Sobre Matané',
      name: 'El nombre Matané viene del japonés. A diferencia de «sayonara», encierra otro sentimiento:',
      line: 'また逢おう、また逢いたい。',
      lineT: 'Nos volveremos a ver. Quiero volver a verte.',
      cityA: 'Tokio', cityB: 'Barcelona',
      two: 'Matané nació de dos historias: una en Tokio y otra en Barcelona.',
      story: [
        'Nuestra fundadora, Suzuki, fue estrechando su relación con quien hoy es su marido a través de la distancia entre Tokio y Barcelona. Durante años viajaron de un lado a otro, despidiéndose una y otra vez con un «matané».',
        'Aunque estuviéramos lejos, cada día el sol salía al mismo ritmo y cada noche asomaba la luna. Vivíamos lejos, pero mirábamos lo mismo.',
        'Saberlo nos sostuvo.',
        'Hoy hemos trasladado nuestra base a Barcelona y vivimos en el mismo lugar.'
      ],
      natureH: 'La naturaleza, en un pequeño mundo',
      nature: [
        'Matané es una marca de joyería que encierra en un pequeño mundo la belleza que crea la naturaleza. Todos nuestros diseños se inspiran en el mundo natural.',
        'Igual que en la naturaleza no hay dos paisajes iguales, cada joya Matané tiene su propio carácter y un diseño único.'
      ],
      miracle: 'El milagro de encontrarnos en este mundo inmenso.',
      ask: '¿Hay alguien a quien quieras decirle matané?',
      cta: 'Ver la colección'
    },
    metals: {
      title: 'Nuestros metales — Matane Jewellery',
      desc: 'Plata de ley, oro de 14K y 18K blanco o amarillo, y platino 950: en qué se diferencian y cómo cuidarlos.',
      h1: 'Seis metales',
      lede: 'Cada pieza se funde por encargo en el metal que elijas. Así se diferencian.',
      homeH: 'Elige tu metal',
      homeP: 'Cada diseño está disponible en seis metales, de la plata de ley al platino.',
      homeLink: 'Comparar los metales',
      link: 'Sobre los metales',
      items: {
        ag: ['92,5 % de plata. Un blanco luminoso y frío, y la forma más accesible de llevar la colección. La plata puede oscurecerse un poco con el tiempo; un paño de pulir le devuelve el brillo.'],
        wg: ['58,5 % de oro, aleado para ganar resistencia y terminado con un baño de rodio brillante. Muy resistente, ideal para anillos y piezas de uso diario.'],
        yg: ['58,5 % de oro. Un amarillo suave y cálido, y una opción resistente para el día a día.'],
        wg18: ['75 % de oro, terminado con baño de rodio para una superficie blanca y brillante. Más oro que el de 14K, con el mismo aspecto luminoso.'],
        yg18: ['75 % de oro. Un amarillo más profundo e intenso, el color clásico de la alta joyería japonesa y europea.'],
        pt: ['95 % de platino. Blanco de forma natural, denso y pesado en la mano. No pierde el color ni necesita baño, y es adecuado para pieles sensibles.']
      },
      care: 'El oro blanco lleva baño de rodio. Según el uso, renovarlo cada pocos años lo mantiene brillante; podemos hacerlo por ti.'
    },
    legalMeta: { updated: 'Última actualización', legal: 'Aviso legal', terms: 'Condiciones de venta', privacy: 'Privacidad', cookies: 'Cookies', termsLower: 'condiciones de venta', privacyLower: 'política de privacidad',
      accept: 'He leído y acepto las {terms}, incluido el derecho de desistimiento de 14 días, y la {privacy}.', mustAccept: 'Acepta las condiciones de venta para continuar.',
      contactNote: 'Usamos tus datos solo para responderte. Consulta nuestra {privacy}.' },
    order: { title: 'Tu pedido — Matane Jewellery', h1: 'Tu pedido', loading: 'Cargando tu pedido…', notFound: 'No encontramos este pedido. Revisa el enlace de tu email de confirmación o escríbenos.',
      number: 'Pedido', date: 'Fecha', total: 'Total', tracking: 'Seguimiento', steps: { paid: 'Pagado', in_production: 'En el taller', shipped: 'Enviado', delivered: 'Entregado' },
      intro: { paid: 'Gracias. Tu pedido está confirmado y pasará al taller en breve.', in_production: 'Estamos haciendo tu pieza en el taller.', shipped: 'Tu pedido está en camino.', delivered: 'Tu pedido ha sido entregado.', refunded: 'Este pedido fue reembolsado.', cancelled: 'Este pedido fue cancelado.' } },
    notFound: { title: 'Página no encontrada — Matane Jewellery', h1: 'Página no encontrada', p: 'Esta página no existe. Prueba con la colección.', cta: 'Ver la colección' }
  },

  ja: {
    htmlLang: 'ja', locale: 'ja-JP', langName: '日本語',
    brand: 'Matane Jewellery',
    nav: { collection: 'ショップ', story: '梅結び', about: 'Matanéについて', size: 'サイズガイド', bag: 'カート' },
    footer: { shipping: '配送・返品', contact: 'お問い合わせ', legal: '特定商取引法・プライバシー', designed: 'バルセロナでデザイン', rights: 'All rights reserved.' },
    previewBanner: 'プレビュー：価格は仮のもので、決済はStripeのテストモードで動作します。',
    skip: '本文へ移動',
    home: {
      title: 'Matane Jewellery — 水引と縄のジュエリー、シルバー・ゴールド・プラチナで',
      desc: '日本の結びと縄のかたちから生まれた、リング、ペンダント、ブレスレット、ピアス。シルバー、14K・18Kゴールド、プラチナで受注制作します。',
      vertical: '水引玉',
      h1: 'ほどけない結びを、身につける。',
      wornH: '身につけて', wornP: 'ペンダントとブレスレットには、同じ地金の細いあずきチェーンが付きます。',
      flagCta: '水引玉を見る', allCta: 'すべての商品',
      flagP: 'Matanéを代表する一点。直径10 mmの編み玉を、シルバー925、14K・18K のホワイト／イエローゴールド、プラチナで。すべてご注文後に制作します。',
      lede: '日本の結びと縄のかたちを、シルバー、ゴールド、プラチナのリング、ペンダント、ブレスレット、ピアスに。',
      cta: 'コレクションを見る',
      collH: 'コレクション',
      collP: '日本の水引や縄のかたちから生まれたコレクション。すべて、お選びいただいた地金でご注文後に制作します。',
      from: '',
      storyH: 'ほどけないように結ぶ',
      storyP: '贈り物に結ぶ水引のなかでも、梅結びは固く結ばれ、ほどくことができません。だからこそ、末永い絆や幸運を願って結ばれてきました。Matane では一本一本の線を磨き上げたワイヤーに置き換え、その意味をそのまま金属に残しました。',
      storyLink: 'ストーリーを読む',
      facts: [
        ['受注制作', 'ご注文後に制作し、{lead}週間で発送します。'],
        ['6種の地金', 'シルバー925、14K・18K のホワイト／イエローゴールド、プラチナ950。'],
        ['送料無料・保険付き', 'ギフトボックスに入れ、保険付きでお届けします。']
      ]
    },
    collection: {
      title: 'ショップ — Matane Jewellery',
      desc: '梅結び、淡路結び、しめ縄の各コレクションのリング、ペンダント、ブレスレット、ピアス。シルバー、14K・18Kゴールド、プラチナ。',
      h1: 'ショップ',
      lede: 'シルバー925、14K・18K のホワイト／イエローゴールド、プラチナ950の6種からお選びいただき、ご注文後に制作します。',
      metals: '3種の地金',
      count: '全{n}点', countOne: '全1点'
    },
    product: {
      metal: '地金',
      size: 'リングサイズ',
      choose: 'サイズを選択',
      sizeGuide: 'サイズガイド',
      add: 'カートに入れる',
      added: 'カートに追加しました',
      viewBag: 'カートを見る',
      needSize: 'リングサイズを選択してください。',
      made: '受注制作。{lead}週間で発送します。',
      ship: '送料無料・保険付き、ギフトボックス入り。',
      details: '詳細',
      photos: '写真',
      view3d: '3D',
      drag: 'ドラッグで回転、ピンチまたはスクロールで拡大できます。',
      wornAlt: 'リネンのディスプレイに着けた{name}（細いあずきチェーン）',
      about: {
        ring: '梅結びを支えるのは、結びと同じ三本線のアーム。鏡面に磨き上げ、編み込まれた花びらのどの角度からも光をとらえます。',
        pendant: '三本線を五つの花びらに、本物の水引のように上下に編み込み、磨き上げたバチカンに下げました。チェーンは別売りです。'
      },
      alt: '{name}（{metal}）、{view}',
      viewsName: { hero: '斜めから', top: '真上から', side: '横から', front: '正面から', flat: '斜めから', cord: '赤い紐に通して', macro: '近くから' }
    },
    story: {
      title: '梅結びの物語 — Matane Jewellery',
      desc: '水引の梅結びと、それを金属で表現するまで。',
      h1: '梅結びのこと',
      sections: [
        ['水引', '水引は、贈り物や祝儀袋に結ぶ和紙のこよりです。結び方そのものが気持ちを伝えます。ほどいて何度でも結び直せる蝶結びもあれば、一度きりであってほしいこと、長く続いてほしいことのために固く結ぶものもあります。'],
        ['梅結び', '梅結びは、梅の花をかたどった結びです。固く結ばれてほどけにくいことから、強い絆や開運、魔除けの意味が込められてきました。'],
        ['梅の花', '梅は冬の終わり、ほかのどの花よりも早く咲きます。松・竹とともに「松竹梅」として、古くから吉祥と忍耐の象徴とされてきました。'],
        ['こよりから金属へ', '結びを形づくる三本の線を、三本の磨き上げたワイヤーとして残し、上下に交わる一つひとつの重なりをたどりました。ご注文ごとにシルバー、ゴールド、またはプラチナで鋳造し、手作業で仕上げます。']
      ],
      cta: 'コレクションを見る'
    },
    size: {
      title: 'リングサイズガイド — Matane Jewellery',
      desc: '日本・EU・USのリングサイズ対応表と測り方。',
      h1: 'サイズガイド',
      lede: 'サイズはヨーロッパ式（EU）で表示しています。EUサイズはリングの内周をミリで表した数字です。',
      howH: 'ご自宅での測り方',
      how: [
        '細い紙を指の付け根に巻きます。',
        '紙が重なるところに印をつけ、長さをミリで測ります。',
        'その数字がEUサイズです。二つのサイズの間なら、大きいほうをお選びください。'
      ],
      tip: '指が温まっている夕方に測り、関節を通るかどうかも確かめてください。',
      th: ['EU', '内周', 'US', '日本'],
      approx: 'USサイズと日本サイズはおおよその換算です。',
      help: '迷ったときはお気軽にお問い合わせください。'
    },
    shipping: {
      title: '配送・返品 — Matane Jewellery',
      desc: '受注制作の納期、配送、返品について。',
      h1: '配送・返品',
      sections: [
        ['受注制作', 'すべてご注文後に鋳造します。{lead}週間で発送の準備が整い、工房から発送した際にメールでお知らせします。'],
        ['配送', '送料無料、保険付きでお届けします。スペイン・EU域内は[2〜5]営業日、その他の地域は[5〜10]営業日が目安です。EU域外へのお届けでは、輸入関税・消費税をお受け取り時にお支払いいただく場合があります。'],
        ['返品', '未使用・お届け時の梱包のままであれば、到着後14日以内に返品・返金を承ります。［特定のサイズで制作した商品が撤回権の対象外となるかどうか、法律の専門家にご確認ください。］返品をご希望の際はご連絡ください。'],
        ['サイズ直し', '［サイズが合わない場合、到着後30日以内であれば一度無料でサイズ直しをいたします。］']
      ]
    },
    contact: {
      title: 'お問い合わせ — Matane Jewellery',
      desc: '商品、サイズ、ご注文についてのお問い合わせ。',
      h1: 'お問い合わせ',
      lede: '商品やサイズ、ご注文についてのご質問は、こちらからお送りください。2営業日以内にご返信します。',
      email: 'メール',
      name: 'お名前', emailField: 'メールアドレス', order: '注文番号（任意）', message: 'メッセージ', send: '送信する',
      sent: '送信しました。2営業日以内にご返信します。'
    },
    legal: {
      title: '特定商取引法・プライバシー — Matane Jewellery',
      desc: '運営者情報、販売条件、プライバシー、Cookieについて。',
      h1: '特定商取引法・プライバシー',
      draft: 'テンプレート：［ ］内を記入し、公開前に内容の確認を受けてください。',
      sections: [
        ['運営者情報', '販売業者：[事業者名]、所在地：[住所]、連絡先：[メールアドレス]、税番号：[NIF/NIE]'],
        ['販売条件', '価格はユーロ表示で、スペインの付加価値税（IVA）を含みます。お支払いの確認をもって契約成立となります。商品はご注文後に制作し、各商品ページに記載の期間内に発送します。決済はStripeで安全に処理され、当店がカード情報を見ることや保存することはありません。'],
        ['プライバシー', 'お名前、メールアドレス、電話番号、ご住所は、商品の制作・発送・アフターサービスのためにのみ使用します。ご注文データはSupabase（EU・フランクフルトのサーバー）に保存し、決済はStripeが処理します。データの開示・訂正・削除のご依頼は[メールアドレス]までご連絡ください。'],
        ['Cookie', '広告や分析のためのCookieは使用していません。カートの中身は、次回もそのまま残るようにブラウザのローカルストレージに保存されます。']
      ]
    },
    bag: {
      title: 'カート — Matane Jewellery',
      h1: 'カート',
      empty: 'カートに商品はありません。',
      emptyCta: 'コレクションを見る',
      size: 'サイズ',
      qty: '数量',
      remove: '削除',
      subtotal: '小計',
      shipping: '送料',
      free: '無料',
      total: '合計',
      vat: '税込（IVA）。',
      checkout: 'ご購入手続きへ',
      redirect: '決済ページを開いています…',
      error: '決済を開始できませんでした。接続を確認して、もう一度お試しください。',
      previewOnly: '決済は、Stripeのキーを設定してサイトを公開すると利用できます。',
      made: '受注制作。{lead}週間で発送します。'
    },
    thanks: {
      title: 'ご注文ありがとうございます — Matane Jewellery',
      h1: 'ご注文ありがとうございます',
      p: 'お支払いが確認され、領収書をメールでお送りしました。これより制作に入り、発送時に改めてご連絡します。',
      cta: 'コレクションに戻る'
    },
    about: {
      title: 'Matanéについて — Matané Jewellery',
      desc: 'Matanéは、東京とバルセロナの２つのストーリーから始まりました。自然が創り出す美を小さな世界に閉じ込めたジュエリーブランドです。',
      h1: 'Matanéについて',
      name: '‘Matané’というブランド名は日本語からきています。さよならと違って、',
      line: 'また逢おう、また逢いたい。',
      lineT: 'そんな想いが込められています。',
      cityA: '東京', cityB: 'バルセロナ',
      two: 'Matanéは、東京とバルセロナの２つのストーリーから始まりました。',
      story: [
        'ブランドオーナーであるSuzukiは、現在の夫と、東京とバルセロナという距離で互いの関係を深めていきました。数年もの間、お互いが行き来し合い、別れ際に幾度となくMatanéを交わしながら。',
        '例え離れていても、毎日同じリズムで日が昇り、夜には月が顔を出す。住む場所は遠くとも、私たちは同じものを目にしている。',
        'その事実が心の支えになりました。',
        '現在は、拠点をバルセロナに移し、同じ土地で暮らしています。'
      ],
      natureH: '自然の美を、小さな世界に',
      nature: [
        'Matanéは、自然が創り出す美を小さな世界に閉じ込めたジュエリーブランドです。全てのデザインは、自然界から発想を得たデザインです。',
        '自然界でひとつとして同じ景色がないように、Matanéジュエリーは、ひとつひとつ個性的でユニークなデザインになっています。'
      ],
      miracle: 'この果てしなく広い世界で出逢えた奇跡。',
      ask: 'あなたには、Matanéを交わしたい人がいますか？',
      cta: 'コレクションを見る'
    },
    metals: {
      title: '地金について — Matane Jewellery',
      desc: 'シルバー925、14K・18Kのホワイト／イエローゴールド、プラチナ950。それぞれの違いとお手入れ。',
      h1: '6種の地金',
      lede: 'すべてのジュエリーは、お選びいただいた地金でご注文後に制作します。それぞれの特徴をご紹介します。',
      homeH: '地金を選ぶ',
      homeP: 'すべてのデザインを、シルバーからプラチナまで6種の地金でお作りします。',
      homeLink: '地金を比べる',
      link: '地金について',
      items: {
        ag: ['銀の含有率92.5%。明るく澄んだ白で、もっとも気軽にお選びいただける地金です。時間とともに少し黒ずむことがありますが、磨き布で輝きが戻ります。'],
        wg: ['金の含有率58.5%。強度を高めた合金に、明るいロジウムメッキを施しています。丈夫で、リングや毎日身につけるジュエリーに向いています。'],
        yg: ['金の含有率58.5%。やわらかく温かみのある黄色で、普段使いにも丈夫な地金です。'],
        wg18: ['金の含有率75%。ロジウムメッキで明るい白に仕上げています。14Kより金を多く含み、同じ輝きをお楽しみいただけます。'],
        yg18: ['金の含有率75%。深みのある豊かな黄色。日本とヨーロッパのジュエリーで親しまれてきた色です。'],
        pt: ['プラチナの含有率95%。もともと白い地金で、密度が高く手にずっしりと感じられます。色あせやメッキの必要がなく、敏感な肌の方にも向いています。']
      },
      care: 'ホワイトゴールドにはロジウムメッキを施しています。使い方にもよりますが、数年ごとにメッキをかけ直すと輝きが保てます。当店でも承ります。'
    },
    legalMeta: { updated: '最終更新日', legal: '特定商取引法に基づく表記', terms: '販売条件', privacy: 'プライバシー', cookies: 'Cookie', termsLower: '販売条件', privacyLower: 'プライバシーポリシー',
      accept: '{terms}（14日間の撤回権を含む）と{privacy}を読み、同意します。', mustAccept: '販売条件に同意してください。',
      contactNote: 'いただいた情報はご返信のためにのみ使用します。{privacy}をご覧ください。' },
    order: { title: 'ご注文状況 — Matane Jewellery', h1: 'ご注文状況', loading: 'ご注文を読み込んでいます…', notFound: 'ご注文が見つかりませんでした。確認メールのリンクをご確認いただくか、お問い合わせください。',
      number: '注文番号', date: 'ご注文日', total: '合計', tracking: '追跡番号', steps: { paid: 'お支払い済み', in_production: '制作中', shipped: '発送済み', delivered: 'お届け済み' },
      intro: { paid: 'ありがとうございます。ご注文を確認しました。まもなく制作に入ります。', in_production: '工房でお作りしています。', shipped: 'ご注文の商品を発送しました。', delivered: 'お届けが完了しました。', refunded: 'このご注文は返金済みです。', cancelled: 'このご注文はキャンセルされました。' } },
    notFound: { title: 'ページが見つかりません — Matane Jewellery', h1: 'ページが見つかりません', p: 'お探しのページは存在しません。コレクションをご覧ください。', cta: 'コレクションを見る' }
  }
};
