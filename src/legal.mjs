// Legal texts (EN / ES / JA). Seller details come from catalog.json → business.
// Template prepared for a Spanish sole trader selling made-to-order jewellery to consumers.
// Have it reviewed by a lawyer or gestoría before launch; [brackets] = details to fill.

export function legal(lang, B, lead) {
  const seller = `${B.name}, trading as ${B.tradeName}`;
  const sellerEs = `${B.name}, con el nombre comercial ${B.tradeName}`;
  const sellerJa = `${B.name}（屋号：${B.tradeName}）`;
  const L = {
    en: {
      legal: {
        title: 'Legal notice', desc: 'Who runs this website and how to contact us.',
        sections: [
          ['Owner of the website', `This website and shop are run by ${seller}, a sole trader (autónoma) registered in Spain. Tax ID (NIF): ${B.taxId}. Address: ${B.address}. Email: ${B.email}. Phone: ${B.phone}.`],
          ['Purpose', 'Online sale of jewellery designed by Matane Jewellery and made to order, to customers in Spain, the rest of the EU and the other countries listed at checkout.'],
          ['Intellectual property', 'The designs, photographs, 3D models, texts and the Matane Jewellery name and logo belong to their owner. You may not copy or reuse them without written permission.'],
          ['Disputes', 'Contracts are governed by Spanish law. As a consumer you keep the protection of the mandatory rules of the country where you live, and you can go to the courts of your place of residence. You can also contact the consumer office (OMIC) or the consumer arbitration board (Junta Arbitral de Consumo) of your region.']
        ]
      },
      terms: {
        title: 'Terms of sale', desc: 'How ordering, payment, delivery, returns and the legal guarantee work.',
        sections: [
          ['Who you buy from', `${seller}. NIF ${B.taxId}, ${B.address}, ${B.email}.`],
          ['Products and prices', 'Prices are in euros and include Spanish VAT. Shipping is free. Each piece is shown in the metal you choose; small differences in colour between screens and the real metal are normal. Pendants and bracelets come on a fine cable chain in the same metal.'],
          ['How the contract is made', 'You choose your pieces, review your bag and pay through Stripe’s secure checkout. The contract is formed when the payment is confirmed. You receive a confirmation email with your order number and a link to follow its status. We keep a copy of every order; you can ask for it at any time.'],
          ['Payment', 'Payment is taken at checkout by Stripe (cards, Apple Pay, Google Pay and other methods shown there). We never see or store your card details.'],
          ['Made to order and delivery', `Every piece is cast after you order and ships within ${lead} weeks. Delivery is insured and usually takes [2–5] working days in Spain and the EU and [5–10] working days elsewhere. Orders sent outside the EU may pay import duties and taxes on delivery. If we cannot meet the date we tell you, and you can cancel for a full refund.`],
          ['Right of withdrawal (14 days)', `You may withdraw from the contract within 14 days of receiving the piece, without giving a reason. Tell us by email at ${B.email} or with the model withdrawal form below. We refund everything you paid, including the original delivery, within 14 days of being told, using the same payment method. We may wait until the piece is back with us. You return the piece within 14 days, unworn and in its packaging; the cost of sending it back is yours. [Legal review: confirm whether rings made to a requested size count as goods “made to the consumer’s specifications”, which are excluded from withdrawal. Until confirmed, this shop allows withdrawal for every piece.]`],
          ['Legal guarantee (3 years)', 'Under Spanish consumer law every piece carries a legal guarantee of conformity of three years from delivery. If a piece has a defect, we repair or replace it free of charge, or refund you if that is not possible. Normal wear, knocks and misuse are not defects.'],
          ['Model withdrawal form', `To: ${seller}, ${B.address}, ${B.email}. I hereby give notice that I withdraw from my contract for the sale of the following goods: [order number and piece]. Ordered on: [date]. Received on: [date]. Name: [your name]. Address: [your address]. Date and signature (only if sent on paper).`],
          ['Complaints', `Write to ${B.email}. We answer within one month. Complaint forms (hojas de reclamaciones) are available on request.`]
        ]
      },
      privacy: {
        title: 'Privacy policy', desc: 'What personal data we collect, why, for how long, and your rights (GDPR).',
        sections: [
          ['Controller', `${seller}, NIF ${B.taxId}, ${B.address}. Contact for privacy: ${B.email}.`],
          ['What we collect', 'When you order: name, email, phone, delivery and billing address, the pieces ordered and the payment status (never your card details). When you write to us: your name, email, optional order number and your message. Technical data: our hosting provider records IP addresses in server logs for security.'],
          ['Why, and on what legal basis', 'To make, deliver and support your order (performance of the contract, art. 6.1.b GDPR). To keep accounting and tax records (legal obligation, art. 6.1.c). To answer your messages (your request and our legitimate interest, art. 6.1.b and 6.1.f). We do not send marketing, sell data or build profiles.'],
          ['How long we keep it', 'Order and invoice records: six years, as Spanish commercial law requires, then anonymised. Messages: twelve months after the last reply. Server logs: as kept by the hosting provider, usually a few days.'],
          ['Who processes it for us', 'Stripe (payments; Stripe Payments Europe Ltd, Ireland). Supabase (order and message database, hosted in Frankfurt, Germany). Netlify (website hosting). [Resend (sending order emails).] The delivery company receives your name, address and phone. Some of these providers belong to US groups; transfers outside the EEA are covered by the EU–US Data Privacy Framework or the EU standard contractual clauses.'],
          ['Your rights', `You can ask to access, correct, delete, restrict or port your data, or object to its use, by writing to ${B.email}. We answer within one month. Records we must keep by law are deleted when that period ends. You can also complain to the Spanish data protection authority, the AEPD (www.aepd.es).`]
        ]
      },
      cookies: {
        title: 'Cookies and storage', desc: 'This site uses no tracking or advertising cookies.',
        sections: [
          ['No tracking', 'This site sets no cookies, uses no analytics and loads nothing from third parties: fonts, images and the 3D viewer are served from our own domain. That is why there is no cookie banner.'],
          ['Your bag', 'The pieces in your bag are kept in your browser’s local storage under the name “matane_bag_v1”, so the bag is still there when you come back. This is strictly necessary for the service you ask for, never leaves your device and is not used to identify you. Empty your bag or clear your browser data to remove it.'],
          ['At checkout', 'Payment happens on Stripe’s checkout page, which uses its own cookies to process the payment safely and prevent fraud. See Stripe’s privacy and cookie policy there.']
        ]
      }
    },
    es: {
      legal: {
        title: 'Aviso legal', desc: 'Quién gestiona este sitio web y cómo contactarnos.',
        sections: [
          ['Titular del sitio web', `En cumplimiento del artículo 10 de la Ley 34/2002 (LSSI-CE), este sitio web y su tienda pertenecen a ${sellerEs}, trabajadora autónoma registrada en España. NIF: ${B.taxId}. Domicilio: ${B.address}. Email: ${B.email}. Teléfono: ${B.phone}.`],
          ['Objeto', 'Venta online de joyas diseñadas por Matane Jewellery y fabricadas por encargo, a clientes en España, el resto de la UE y los demás países indicados en el pago.'],
          ['Propiedad intelectual', 'Los diseños, fotografías, modelos 3D, textos y el nombre y logotipo de Matane Jewellery pertenecen a su titular. No pueden copiarse ni reutilizarse sin permiso por escrito.'],
          ['Ley aplicable y reclamaciones', 'Los contratos se rigen por la ley española. Como consumidor, mantienes la protección de las normas imperativas del país donde vives y puedes acudir a los tribunales de tu domicilio. También puedes dirigirte a la oficina de consumo (OMIC) o a la Junta Arbitral de Consumo de tu comunidad.']
        ]
      },
      terms: {
        title: 'Condiciones de venta', desc: 'Cómo funcionan el pedido, el pago, la entrega, las devoluciones y la garantía legal.',
        sections: [
          ['A quién compras', `${sellerEs}. NIF ${B.taxId}, ${B.address}, ${B.email}.`],
          ['Productos y precios', 'Los precios están en euros e incluyen el IVA. El envío es gratuito. Cada pieza se muestra en el metal que elijas; es normal que el color varíe ligeramente entre pantallas y el metal real. Los colgantes y pulseras se entregan con una fina cadena forzada del mismo metal.'],
          ['Cómo se forma el contrato', 'Eliges tus piezas, revisas la cesta y pagas en la pasarela segura de Stripe. El contrato se perfecciona cuando se confirma el pago. Recibes un email de confirmación con tu número de pedido y un enlace para seguir su estado. Guardamos una copia de cada pedido; puedes pedirla cuando quieras.'],
          ['Pago', 'El pago se realiza en la pasarela de Stripe (tarjetas, Apple Pay, Google Pay y otros métodos que se muestren allí). Nunca vemos ni guardamos los datos de tu tarjeta.'],
          ['Fabricación por encargo y entrega', `Cada pieza se funde después de tu pedido y se envía en ${lead} semanas. El envío está asegurado y suele tardar [2–5] días laborables en España y la UE y [5–10] en el resto del mundo. Los envíos fuera de la UE pueden pagar aranceles e impuestos en la entrega. Si no podemos cumplir el plazo te avisamos y puedes cancelar con reembolso completo.`],
          ['Derecho de desistimiento (14 días)', `Puedes desistir del contrato en los 14 días naturales siguientes a la recepción de la pieza, sin indicar el motivo. Comunícalo por email a ${B.email} o con el formulario de desistimiento que figura abajo. Te reembolsamos todo lo pagado, incluido el envío original, en un plazo de 14 días desde que nos lo comuniques, por el mismo medio de pago. Podemos esperar a recibir la pieza. Debes devolverla en 14 días, sin usar y en su embalaje; el coste del envío de vuelta corre de tu cuenta. [Revisión legal: confirmar si los anillos fabricados en la talla solicitada se consideran bienes «confeccionados conforme a las especificaciones del consumidor», excluidos del desistimiento (art. 103.c TRLGDCU). Mientras tanto, la tienda admite el desistimiento en todas las piezas.]`],
          ['Garantía legal (3 años)', 'Según la normativa española de consumo, cada pieza tiene una garantía legal de conformidad de tres años desde la entrega. Si una pieza tiene un defecto, la reparamos o sustituimos sin coste o, si no es posible, te devolvemos el importe. El desgaste normal, los golpes y el mal uso no son defectos.'],
          ['Modelo de formulario de desistimiento', `A la atención de: ${sellerEs}, ${B.address}, ${B.email}. Por la presente le comunico que desisto de mi contrato de venta del siguiente bien: [número de pedido y pieza]. Pedido el: [fecha]. Recibido el: [fecha]. Nombre: [tu nombre]. Domicilio: [tu domicilio]. Firma (solo si se envía en papel) y fecha.`],
          ['Reclamaciones', `Escríbenos a ${B.email}. Respondemos en el plazo de un mes. Hay hojas de reclamaciones a tu disposición.`]
        ]
      },
      privacy: {
        title: 'Política de privacidad', desc: 'Qué datos personales tratamos, para qué, durante cuánto tiempo y tus derechos (RGPD).',
        sections: [
          ['Responsable', `${sellerEs}, NIF ${B.taxId}, ${B.address}. Contacto de privacidad: ${B.email}.`],
          ['Qué datos tratamos', 'Al hacer un pedido: nombre, email, teléfono, dirección de entrega y facturación, las piezas pedidas y el estado del pago (nunca los datos de tu tarjeta). Al escribirnos: tu nombre, email, número de pedido opcional y tu mensaje. Datos técnicos: nuestro proveedor de alojamiento registra direcciones IP en los registros del servidor por seguridad.'],
          ['Para qué y con qué base jurídica', 'Para fabricar, entregar y atender tu pedido (ejecución del contrato, art. 6.1.b RGPD). Para cumplir obligaciones contables y fiscales (obligación legal, art. 6.1.c). Para responder tus mensajes (tu solicitud e interés legítimo, art. 6.1.b y 6.1.f). No enviamos publicidad, no vendemos datos ni elaboramos perfiles.'],
          ['Cuánto tiempo los conservamos', 'Pedidos y facturas: seis años, como exige el Código de Comercio; después se anonimizan. Mensajes: doce meses desde la última respuesta. Registros del servidor: los que conserve el proveedor de alojamiento, normalmente unos días.'],
          ['Encargados del tratamiento', 'Stripe (pagos; Stripe Payments Europe Ltd, Irlanda). Supabase (base de datos de pedidos y mensajes, alojada en Fráncfort, Alemania). Netlify (alojamiento web). [Resend (envío de emails de pedido).] La empresa de transporte recibe tu nombre, dirección y teléfono. Algunos proveedores pertenecen a grupos estadounidenses; las transferencias fuera del EEE se amparan en el Marco de Privacidad de Datos UE-EE. UU. o en las cláusulas contractuales tipo de la UE.'],
          ['Tus derechos', `Puedes ejercer tus derechos de acceso, rectificación, supresión, limitación, portabilidad y oposición escribiendo a ${B.email}. Respondemos en el plazo de un mes. Los datos que debemos conservar por ley se suprimen al terminar ese plazo. También puedes reclamar ante la Agencia Española de Protección de Datos (www.aepd.es).`]
        ]
      },
      cookies: {
        title: 'Cookies y almacenamiento', desc: 'Este sitio no usa cookies de seguimiento ni de publicidad.',
        sections: [
          ['Sin seguimiento', 'Este sitio no instala cookies, no usa analítica y no carga nada de terceros: las fuentes, las imágenes y el visor 3D se sirven desde nuestro propio dominio. Por eso no hay banner de cookies.'],
          ['Tu cesta', 'Las piezas de tu cesta se guardan en el almacenamiento local de tu navegador con el nombre «matane_bag_v1», para que sigan ahí cuando vuelvas. Es estrictamente necesario para el servicio que solicitas, no sale de tu dispositivo y no sirve para identificarte. Vacía la cesta o borra los datos del navegador para eliminarlo.'],
          ['En el pago', 'El pago se realiza en la página de Stripe, que usa sus propias cookies para procesar el pago de forma segura y prevenir el fraude. Consulta allí la política de privacidad y cookies de Stripe.']
        ]
      }
    },
    ja: {
      legal: {
        title: '特定商取引法に基づく表記・運営者情報', desc: '運営者情報と特定商取引法に基づく表記。',
        sections: [
          ['販売業者', `${sellerJa}（スペインの個人事業主）`],
          ['所在地', `${B.address}`],
          ['連絡先', `メール：${B.email}　電話番号：${B.phone}（お問い合わせはメールでお願いします）`],
          ['税番号', `NIF：${B.taxId}`],
          ['販売価格', '各商品ページに表示（ユーロ表示、スペインの付加価値税込み）。'],
          ['商品代金以外の必要料金', '送料無料。EU域外へのお届けでは、輸入関税・消費税をお受け取り時にお支払いいただく場合があります。'],
          ['お支払い方法と時期', 'Stripeによるクレジットカード等の決済。ご注文時にお支払いが確定します。'],
          ['引き渡し時期', `ご注文後に制作し、${lead}週間で発送します。`],
          ['返品・キャンセル', '商品到着後14日以内であれば、理由を問わず返品・返金を承ります（未使用・お届け時の梱包のまま、返送料はお客様負担）。詳細は販売条件をご覧ください。'],
          ['準拠法', 'スペイン法。お住まいの国の強行法規による消費者保護は維持されます。']
        ]
      },
      terms: {
        title: '販売条件', desc: 'ご注文、お支払い、配送、返品、法定保証について。',
        sections: [
          ['販売者', `${sellerJa}。NIF ${B.taxId}、${B.address}、${B.email}。`],
          ['商品と価格', '価格はユーロ表示で、スペインの付加価値税（IVA）を含みます。送料は無料です。地金の色味は画面と実物でわずかに異なる場合があります。ペンダントとブレスレットには同じ地金の細いあずきチェーンが付きます。'],
          ['契約の成立', 'カートの内容をご確認のうえ、Stripeの安全な決済ページでお支払いください。お支払いの確認をもって契約成立となります。注文番号と状況確認用リンクを記載した確認メールをお送りします。'],
          ['お支払い', 'Stripe（クレジットカード、Apple Pay、Google Payなど）で決済します。当店がカード情報を見ることや保存することはありません。'],
          ['受注制作と配送', `すべてご注文後に鋳造し、${lead}週間で発送します。保険付きで、スペイン・EU域内は[2〜5]営業日、その他の地域は[5〜10]営業日が目安です。期日に間に合わない場合はご連絡し、全額返金でのキャンセルも承ります。`],
          ['撤回権（14日間）', `商品到着後14日以内であれば、理由を問わず契約を撤回できます。${B.email}までメール、または下記の撤回フォームでお知らせください。ご連絡から14日以内に、送料を含む全額を同じお支払い方法で返金します。商品は14日以内に、未使用・お届け時の梱包のままご返送ください（返送料はお客様負担）。［法律確認：ご指定サイズで制作したリングが撤回権の対象外となるかを確認してください。それまでは全商品で撤回を受け付けます。］`],
          ['法定保証（3年間）', 'スペインの消費者法により、お届けから3年間の適合性保証があります。不具合がある場合は無償で修理・交換し、できない場合は返金します。通常の摩耗、衝撃、誤った使用は対象外です。'],
          ['撤回フォーム（記入例）', `宛先：${sellerJa}、${B.address}、${B.email}。私は以下の商品の売買契約を撤回します：［注文番号・商品］。注文日：［日付］。受取日：［日付］。氏名：［お名前］。住所：［ご住所］。日付・署名（書面の場合のみ）。`],
          ['お問い合わせ・苦情', `${B.email}までご連絡ください。1か月以内にご返信します。`]
        ]
      },
      privacy: {
        title: 'プライバシーポリシー', desc: '取得する個人データ、利用目的、保存期間、お客様の権利（GDPR）。',
        sections: [
          ['管理者', `${sellerJa}、NIF ${B.taxId}、${B.address}。お問い合わせ：${B.email}。`],
          ['取得するデータ', 'ご注文時：お名前、メールアドレス、電話番号、お届け先・請求先住所、ご注文内容、お支払い状況（カード情報は含みません）。お問い合わせ時：お名前、メールアドレス、注文番号（任意）、メッセージ。技術情報：ホスティング事業者がセキュリティのためIPアドレスをサーバーログに記録します。'],
          ['利用目的と法的根拠', '商品の制作・発送・アフターサービス（契約の履行、GDPR第6条1項b）。会計・税務記録の保存（法的義務、同c）。お問い合わせへの回答（ご依頼および正当な利益、同bおよびf）。広告の送信、データの販売、プロファイリングは行いません。'],
          ['保存期間', '注文・請求記録：スペイン商法に基づき6年間保存し、その後匿名化します。メッセージ：最後の返信から12か月。サーバーログ：ホスティング事業者の保存期間（通常数日）。'],
          ['委託先', 'Stripe（決済、Stripe Payments Europe Ltd・アイルランド）、Supabase（注文・メッセージのデータベース、ドイツ・フランクフルト）、Netlify（ウェブサイトのホスティング）、［Resend（注文メールの送信）］。配送業者にはお名前・住所・電話番号を提供します。EEA域外への移転は、EU・米国データプライバシー・フレームワークまたはEU標準契約条項に基づきます。'],
          ['お客様の権利', `アクセス、訂正、削除、処理の制限、データポータビリティ、異議申し立ての権利があります。${B.email}までご連絡ください。1か月以内に対応します。スペインのデータ保護機関（AEPD、www.aepd.es）に苦情を申し立てることもできます。`]
        ]
      },
      cookies: {
        title: 'Cookieとストレージ', desc: '追跡・広告目的のCookieは使用していません。',
        sections: [
          ['追跡なし', '当サイトはCookieを設定せず、アクセス解析も使用せず、外部から何も読み込みません。フォント、画像、3Dビューアはすべて当サイトのドメインから配信しています。そのためCookieバナーはありません。'],
          ['カート', 'カートの中身は「matane_bag_v1」という名前でブラウザのローカルストレージに保存され、次回もそのまま残ります。ご依頼のサービスに厳密に必要なもので、お使いの端末の外に送られることはなく、個人の識別にも使用しません。カートを空にするか、ブラウザのデータを消去すると削除されます。'],
          ['お支払い時', 'お支払いはStripeの決済ページで行われ、安全な決済と不正防止のためにStripe独自のCookieが使用されます。詳しくはStripeのプライバシー・Cookieポリシーをご覧ください。']
        ]
      }
    }
  };
  return L[lang];
}
