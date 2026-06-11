-- Seed data migrasi dari products.ts
-- Menghapus data lama jika ada (opsional, hati-hati jika di production)
-- TRUNCATE articles, story_scenes, carousel_items, media_assets CASCADE;

DO $$
DECLARE
  -- Variables for NYX
  article_nyx_id uuid := gen_random_uuid();
  asset_nyx_cover uuid := gen_random_uuid();
  asset_nyx_hover uuid := gen_random_uuid();
  asset_nyx_c1 uuid := gen_random_uuid();
  asset_nyx_c2 uuid := gen_random_uuid();
  asset_nyx_c3 uuid := gen_random_uuid();
  scene_nyx_1 uuid := gen_random_uuid();
  scene_nyx_2 uuid := gen_random_uuid();
  scene_nyx_3 uuid := gen_random_uuid();
  scene_nyx_4 uuid := gen_random_uuid();

  -- Variables for CYRO
  article_cyro_id uuid := gen_random_uuid();
  asset_cyro_cover uuid := gen_random_uuid();
  asset_cyro_hover uuid := gen_random_uuid();
  asset_cyro_c1 uuid := gen_random_uuid();
  asset_cyro_c2 uuid := gen_random_uuid();
  asset_cyro_c3 uuid := gen_random_uuid();
  scene_cyro_1 uuid := gen_random_uuid();
  scene_cyro_2 uuid := gen_random_uuid();
  scene_cyro_3 uuid := gen_random_uuid();
  scene_cyro_4 uuid := gen_random_uuid();
  scene_cyro_5 uuid := gen_random_uuid();

  -- Variables for GREED
  article_greed_id uuid := gen_random_uuid();
  asset_greed_cover uuid := gen_random_uuid();
  asset_greed_hover uuid := gen_random_uuid();
  asset_greed_c1 uuid := gen_random_uuid();
  asset_greed_c2 uuid := gen_random_uuid();
  asset_greed_c3 uuid := gen_random_uuid();
  scene_greed_1 uuid := gen_random_uuid();
  scene_greed_2 uuid := gen_random_uuid();
  scene_greed_3 uuid := gen_random_uuid();
  scene_greed_4 uuid := gen_random_uuid();
  scene_greed_5 uuid := gen_random_uuid();

  -- Variables for LUST
  article_lust_id uuid := gen_random_uuid();
  asset_lust_cover uuid := gen_random_uuid();
  asset_lust_hover uuid := gen_random_uuid();
  asset_lust_c1 uuid := gen_random_uuid();
  asset_lust_c2 uuid := gen_random_uuid();
  scene_lust_1 uuid := gen_random_uuid();
  scene_lust_2 uuid := gen_random_uuid();
  scene_lust_3 uuid := gen_random_uuid();
  scene_lust_4 uuid := gen_random_uuid();

BEGIN
  -- ==========================================
  -- 1. INSERT MEDIA ASSETS
  -- ==========================================
  INSERT INTO media_assets (id, storage_path, public_url) VALUES
  (asset_nyx_cover, 'NYX/Nyx-01.webp', '/img/NYX/Nyx-01.webp'),
  (asset_nyx_hover, 'NYX/Nyx-02.webp', '/img/NYX/Nyx-02.webp'),
  (asset_nyx_c1, 'NYX/Nyx-01.webp', '/img/NYX/Nyx-01.webp'),
  (asset_nyx_c2, 'NYX/Nyx-02.webp', '/img/NYX/Nyx-02.webp'),
  (asset_nyx_c3, 'NYX/Nyx-03.webp', '/img/NYX/Nyx-03.webp'),

  (asset_cyro_cover, 'CYRO/FRONT_mockup.webp', '/img/CYRO/FRONT_mockup.webp'),
  (asset_cyro_hover, 'CYRO/BACK_mockup.webp', '/img/CYRO/BACK_mockup.webp'),
  (asset_cyro_c1, 'CYRO/FRONT_mockup.webp', '/img/CYRO/FRONT_mockup.webp'),
  (asset_cyro_c2, 'CYRO/closeup_graphics.webp', '/img/CYRO/closeup_graphics.webp'),
  (asset_cyro_c3, 'CYRO/fit_style.webp', '/img/CYRO/fit_style.webp'),

  (asset_greed_cover, 'GREED/FRONT_mockup.webp', '/img/GREED/FRONT_mockup.webp'),
  (asset_greed_hover, 'GREED/BACK_mockup.webp', '/img/GREED/BACK_mockup.webp'),
  (asset_greed_c1, 'GREED/FRONT_mockup.webp', '/img/GREED/FRONT_mockup.webp'),
  (asset_greed_c2, 'GREED/back_closeup.webp', '/img/GREED/back_closeup.webp'),
  (asset_greed_c3, 'GREED/2.webp', '/img/GREED/2.webp'),

  (asset_lust_cover, 'hero/IMG_0514.webp', '/img/hero/IMG_0514.webp'),
  (asset_lust_hover, 'hero/IMG_9283.JPG.webp', '/img/hero/IMG_9283.JPG.webp'),
  (asset_lust_c1, 'hero/IMG_0514.webp', '/img/hero/IMG_0514.webp'),
  (asset_lust_c2, 'hero/IMG_9283.JPG.webp', '/img/hero/IMG_9283.JPG.webp');


  -- ==========================================
  -- 1.5 DELETE EXISTING DATA TO PREVENT DUPLICATES
  -- ==========================================
  DELETE FROM articles WHERE slug IN ('nyx', 'cyro', 'greed', 'lust');

  -- ==========================================
  -- 2. INSERT ARTICLES
  -- ==========================================
  INSERT INTO articles (id, title, slug, status, theme, hero_title, hero_subtitle, product_description, story_content, cover_image_id, og_image_id) VALUES
  (
    article_nyx_id, 'NYX', 'nyx', 'published', 'Single Releases', 'NYX', 'Enthralling Darkness',
    'Kaos Oversized T-Shirt Boxy Fit bergaya American Comic Style. Premium Cotton Combed 24s untuk kenyamanan maksimal.',
    'Kaos Streetwear Boxy Fit NYX membawa gaya American Comic yang tegas ke dalam siluet fashion modern. Menggunakan Premium Cotton Combed 24s dengan potongan oversized t-shirt yang memberikan kenyamanan ekstra. Pilihan tepat untuk tampil bold dengan brand lokal streetwear Indonesia.',
    asset_nyx_cover, asset_nyx_hover
  ),
  (
    article_cyro_id, 'CYRO', 'cyro', 'published', 'Single Releases', 'CYRO', 'This House Is a Circus',
    'Boxy T-Shirt Streetwear dengan desain grafis ekspresif. Terbuat dari Premium Cotton Combed 24s untuk daily wear.',
    'Ekspresikan kebebasan sejati dengan Kaos Boxy Fit CYRO. Mengusung filosofi "My life. My rules.", t-shirt streetwear pria ini memadukan siluet boxy fit khas Neighbormind dengan grafis pemberontak. Material Premium Cotton Combed 24s memastikan sirkulasi udara optimal sepanjang hari.',
    asset_cyro_cover, asset_cyro_hover
  ),
  (
    article_greed_id, 'GREED', 'greed', 'published', '7DS Series', 'GREED', 'The End of a King',
    'Boxy Long Sleeve T-Shirt eksklusif dengan premium screen printing. Desain 7 Deadly Sins untuk gaya streetwear premium.',
    'Koleksi eksklusif Kaos Streetwear Boxy Long Sleeve GREED dari seri 7 Deadly Sins. Menghadirkan perpaduan material premium dan screen printing plastisol berkualitas tinggi yang tahan lama. Didesain khusus untuk pecinta fashion streetwear lokal Indonesia yang mencari siluet boxy fit sempurna.',
    asset_greed_cover, asset_greed_hover
  ),
  (
    article_lust_id, 'LUST', 'lust', 'published', '7DS Series', 'LUST', 'Not desire. Control.',
    'Boxy Long Sleeve T-Shirt eksklusif. Desain 7 Deadly Sins untuk gaya streetwear premium.',
    'Koleksi eksklusif Kaos Streetwear LUST dari seri 7 Deadly Sins. Menghadirkan perpaduan material premium dan screen printing plastisol berkualitas tinggi yang tahan lama.',
    asset_lust_cover, asset_lust_hover
  );


  -- ==========================================
  -- 3. INSERT STORY SCENES
  -- ==========================================
  
  -- NYX Scenes
  INSERT INTO story_scenes (id, article_id, scene_title, large_headline, supporting_narrative, display_order) VALUES
  (scene_nyx_1, article_nyx_id, 'NYX', 'Enthralling Darkness', NULL, 1),
  (scene_nyx_2, article_nyx_id, NULL, 'Some try so hard to fit in. Some find peace in standing out.', 'Bagi sebagian orang, diterima oleh lingkungan adalah segalanya. Kita diajarkan untuk merunduk dan mengikuti aturan main. Namun bagi sebagian lainnya, tuntutan untuk terus menyesuaikan diri justru terasa melelahkan. NYX lahir dari rasa lelah itu. Sebuah karya untuk mereka yang akhirnya berhenti berusaha menjadi apa yang orang lain inginkan.', 2),
  (scene_nyx_3, article_nyx_id, 'The Details', NULL, NULL, 3),
  (scene_nyx_4, article_nyx_id, NULL, 'This piece is for the quiet minds with the loudest thoughts.', NULL, 4);

  -- CYRO Scenes
  INSERT INTO story_scenes (id, article_id, scene_title, large_headline, supporting_narrative, display_order) VALUES
  (scene_cyro_1, article_cyro_id, 'CYRO', 'This House Is a Circus', NULL, 1),
  (scene_cyro_2, article_cyro_id, NULL, 'Some houses protect you. Some teach you how to survive.', 'Bagi sebagian orang, rumah adalah tempat pulang. Namun bagi sebagian lainnya, rumah justru menjadi tempat pertama di mana luka dimulai. Sirkus di sini adalah simbol kekacauan. Rumah menjadi panggung tempat semua orang memainkan peran berpura-pura baik-baik saja.', 2),
  (scene_cyro_3, article_cyro_id, 'The Details', NULL, NULL, 3),
  (scene_cyro_4, article_cyro_id, NULL, 'Not every house is a home. Some are just circuses with locked doors.', NULL, 4),
  (scene_cyro_5, article_cyro_id, NULL, 'For those who grew up in noise, and learned silence as self-defense.', NULL, 5);

  -- GREED Scenes
  INSERT INTO story_scenes (id, article_id, scene_title, large_headline, supporting_narrative, display_order) VALUES
  (scene_greed_1, article_greed_id, 'GREED', 'The End of a King', NULL, 1),
  (scene_greed_2, article_greed_id, NULL, 'Bukan tentang uang. Bukan tentang harta.', 'Koleksi ini terinspirasi dari keruntuhan monarki Prancis, ketika kemewahan istana berdiri di atas kelaparan rakyat. Setiap elemen desain merepresentasikan akhir dari kekuasaan yang dibangun oleh keserakahan—tahta yang dipertahankan terlalu lama, pemimpin yang menutup mata.', 2),
  (scene_greed_3, article_greed_id, 'The Details', NULL, NULL, 3),
  (scene_greed_4, article_greed_id, NULL, 'Tetapi tentang bagaimana keserakahan membuat seseorang percaya bahwa ia tak akan pernah jatuh.', NULL, 4),
  (scene_greed_5, article_greed_id, NULL, 'Kemewahan yang dibangun di atas penderitaan akan selalu berakhir dengan revolusi.', NULL, 5);

  -- LUST Scenes
  INSERT INTO story_scenes (id, article_id, scene_title, large_headline, supporting_narrative, display_order) VALUES
  (scene_lust_1, article_lust_id, 'LUST', 'Not desire. Control.', NULL, 1),
  (scene_lust_2, article_lust_id, NULL, 'History remembers Cleopatra as a queen. Power remembers her differently.', 'Lust bukanlah tentang nafsu semata. Lust adalah tentang magnetisme. Tentang sebuah karisma yang begitu kuat hingga mampu menundukkan logika dan membuat orang lain menyerahkan kendali dengan sukarela. Desain ini menangkap esensi godaan yang tersembunyi di balik otoritas.', 2),
  (scene_lust_3, article_lust_id, 'The Details', NULL, NULL, 3),
  (scene_lust_4, article_lust_id, NULL, 'Bukan tentang cinta. Bukan tentang kecantikan. Tetapi tentang bagaimana hasrat mampu mengendalikan dunia.', NULL, 4);


  -- ==========================================
  -- 4. INSERT CAROUSEL ITEMS
  -- ==========================================
  
  -- NYX Carousel
  INSERT INTO carousel_items (scene_id, image_id, title, description, display_order) VALUES
  (scene_nyx_3, asset_nyx_c1, 'The Look', 'Siluet Oversized Boxy Fit yang merelaksasi bentuk tubuh. Tampil bold tanpa mengorbankan kenyamanan.', 1),
  (scene_nyx_3, asset_nyx_c2, 'Street Style', 'Sisi jujur yang bebas berekspresi, dirancang untuk mencuri perhatian di setiap langkah.', 2),
  (scene_nyx_3, asset_nyx_c3, 'The Graphic', 'Grafis American Comic Style yang berani. Bukan tatapan marah, melainkan penolakan atas ekspektasi lingkungan.', 3);

  -- CYRO Carousel
  INSERT INTO carousel_items (scene_id, image_id, title, description, display_order) VALUES
  (scene_cyro_3, asset_cyro_c1, 'The Silhouette', 'Siluet boxy fit khas Neighbormind. Memberikan ruang gerak bebas dengan sirkulasi udara optimal.', 1),
  (scene_cyro_3, asset_cyro_c2, 'The Graphic', 'Ilustrasi ekspresif yang menangkap emosi kekacauan dan pemberontakan dari dalam.', 2),
  (scene_cyro_3, asset_cyro_c3, 'The Fit', 'Potongan proporsional yang sempurna untuk menemani aktivitas harian Anda. My life. My rules.', 3);

  -- GREED Carousel
  INSERT INTO carousel_items (scene_id, image_id, title, description, display_order) VALUES
  (scene_greed_3, asset_greed_c1, 'The Fit', 'Siluet lengan panjang (Long Sleeve) memperkuat aura dominasi dari koleksi 7 Deadly Sins.', 1),
  (scene_greed_3, asset_greed_c2, 'The Graphic', 'Ilustrasi detail mahkota yang jatuh, simbol dari tahta yang dipertahankan terlalu lama.', 2),
  (scene_greed_3, asset_greed_c3, 'Premium Material', 'Screen printing plastisol berkualitas tinggi yang menyatu pada material Cotton premium.', 3);

  -- LUST Carousel
  INSERT INTO carousel_items (scene_id, image_id, title, description, display_order) VALUES
  (scene_lust_3, asset_lust_c1, 'The Aura', 'Perpaduan warna bold dan artwork eksklusif 7 Deadly Sins yang memancarkan dominasi.', 1),
  (scene_lust_3, asset_lust_c2, 'The Gaze', 'Desain yang memikat mata sebelum menuntut perhatian penuh dari sekeliling.', 2);

END $$;
