import { EmptyPage } from '../components/page.js';
import { SiteHeader } from '../components/site-header.js';

const enum Day { SUN, MON, TUE, WED, THUR, FRI, SAT };

export default <>
  <EmptyPage favicons={<link rel="icon" type="image/png" sizes="32x32" href='./favicon.ico' />}>
    <link rel='stylesheet' href='./style.css' />
    <script src='./$client.js' type='module' />

    <Tabs tabs={{
      "Morning":
        <Slideshow>
          <AngelMorning />
          <MorningPrayers />
          <LitanyOfSaints />
          <OurFather />
          <HailMary />
          <GloryBe />
          <PreciousBlood />
          <SaintMichael />
          <HolyFamilyPrayer />
        </Slideshow>,
      "Noon":
        <Slideshow>
          <Intro />
          <SaintMichael />
          <AngelMorning />
          <OurFather />
          <HailMary />
          <GloryBe />
          <LitanyOfThePreciousBlood />
          <Sunday />
          <Monday />
          <Tuesday />
          <Wednesday />
          <Thursday />
          <Friday />
          <Saturday />
          <Conclusion />
        </Slideshow>,
      "Night":
        <Slideshow>
          <AngelNight />
          <OurFather />
          <HailMary />
          <GloryBe />
          <PreciousBlood />
          <SaintMichael />
          <Memorare />
          <HolyFamilyPrayer />
        </Slideshow>,
      "Rosary":
        <Slideshow>
          <ApostlesCreed />
          <OurFather />
          <HailMary />
          <HailMary />
          <HailMary />
          <GloryBe />
          <JoyfulMysteries />
          <LuminousMysteries />
          <SorrowfulMysteries />
          <GloriousMysteries />
          <HailHolyQueen />
          <RosaryPrayer />
          <SaintMichael />
          <OurFather />
          <HailMary />
          <GloryBe />
        </Slideshow>,
    }} />
  </EmptyPage>
</>;

function JoyfulMysteries() {
  return <Mystery
    name='Joyful'
    days={[Day.SAT, Day.MON]}
    mysteries={{
      'The Annunciation': [
        'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Annunciation_%28Leonardo%29.jpg/2560px-Annunciation_%28Leonardo%29.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/The_Annunciation%2C_Philadelphia_Museum_of_Art%2C_W1899-1-1-pma%2C_by_Henry_Ossawa_Tanner.jpg/2553px-The_Annunciation%2C_Philadelphia_Museum_of_Art%2C_W1899-1-1-pma%2C_by_Henry_Ossawa_Tanner.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/6/66/Peter_Paul_Rubens_-_Annunciation_-_WGA20189.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/5/5c/Titian_-_The_Annunciation_-_WGA22821.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/e/ea/John_William_Waterhouse_-_The_Annunciation.JPG',
        'https://upload.wikimedia.org/wikipedia/commons/d/d6/Bartolom%C3%A9_Esteban_Perez_Murillo_023.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/3/3a/Philippe_de_Champaigne_-_Annunciation_-_WGA04705.jpg',
      ],
      'Visitation to Elizabeth': [
        'https://upload.wikimedia.org/wikipedia/commons/e/e9/Mariotto_Albertinelli_-_Visitation_-_WGA0129.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/La_Visitation_avec_Marie-Jacobie_et_Marie-Salom%C3%A9_-_Domenico_Ghirlandaio_-_Mus%C3%A9e_du_Louvre_Peintures_INV_297_%3B_MR_240.jpg/1992px-La_Visitation_avec_Marie-Jacobie_et_Marie-Salom%C3%A9_-_Domenico_Ghirlandaio_-_Mus%C3%A9e_du_Louvre_Peintures_INV_297_%3B_MR_240.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/9/9e/Visitaci%C3%B3n_de_Rafael.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/7/74/Jacopo_Tintoretto_-_Visitation_-_WGA22645.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/f/f4/Jer%C3%B3nimo_Ezquerra_Visitation.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/9/94/Rubens%2C_La_Visitation.jpg',
      ],
      'Nativity / Christmas': [
        'https://upload.wikimedia.org/wikipedia/commons/d/d1/Charles_Le_Brun.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/f/f8/Mystic_Nativity%2C_Sandro_Botticelli.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/0/05/Gerard_van_Honthorst_-_Adoration_of_the_Shepherds_%281622%29.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/5/50/The_Nativity_%28John_Singleton_Copley%29.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/a/a0/Federico_Barocci_-_The_Nativity_-_WGA01293.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/3/38/Gerard_van_Honthorst_001.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/6/63/The_Adoration_of_the_Shepherds%2C_El_Greco.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/8/82/Peter_Paul_Rubens_009.jpg',
      ],
      'Presentation at the Temple': [
        'https://upload.wikimedia.org/wikipedia/commons/9/91/Simon_Vouet_-_Presentation_in_the_Temple_-_WGA25366.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Tintoretto_-_Presentation_at_the_Temple.jpg/1920px-Tintoretto_-_Presentation_at_the_Temple.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/e/e6/Presentation_of_Jesus_at_the_Temple_and_the_Baptism_of_Christ_by_Cleyn.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/4/44/Cornelis_de_Vos_-_Mysteries_of_the_Rosary%2C_Presentation_of_Jesus_at_the_temple.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Madonna_dell%27Orto_%28Venice%29_-_Presentation_at_the_temple_of_the_Virgin_%281552-1553%29_by_Tintoretto.jpg/2352px-Madonna_dell%27Orto_%28Venice%29_-_Presentation_at_the_temple_of_the_Virgin_%281552-1553%29_by_Tintoretto.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/4/4a/Rembrandt_Christ_and_the_Woman_Taken_in_Adultery.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/3/35/Willem_de_Poorter_-_Simeon%27s_Song_of_Praise.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/0/0e/Rembrandt_Presentation_in_the_Temple.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/5/59/Romanino%2C_presentazione_di_ges%C3%B9_al_tempio.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/1/19/Paolo_Veronese_-_Presentation_in_the_Temple_-_WGA24793.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/8/84/Presentation_of_Jesus_at_the_Temple_by_Fra_Angelico_%28San_Marco_Cell_10%29.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/0/0a/Fra_Bartolomeo_007.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/8/84/Ambrogio_Lorenzetti_-_The_Presentation_in_the_Temple_-_WGA13480.jpg',
      ],
      'Finding at the Temple': [
        'https://upload.wikimedia.org/wikipedia/commons/5/57/Jan_Steen_-_Child_Jesus_in_the_Temple.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/1/18/Disputa_con_los_doctores_%28El_Veron%C3%A9s%29_grande.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/5/51/Cima_da_Conegliano_Christ_among_the_doctors.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/a/a5/Der_zw%C3%B6lfj%C3%A4hrige_Jesus_im_Tempel.jpg',
      ],
    }} />;
}

function LuminousMysteries() {
  return <Mystery
    name='Luminous'
    days={[Day.THUR]}
    mysteries={{
      'Baptism in the Jordan': [
        'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Peter_Paul_Rubens_-_Doopsel_van_Christus_%28Antwerp%29.jpg/2560px-Peter_Paul_Rubens_-_Doopsel_van_Christus_%28Antwerp%29.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/4/47/Nicolas_Poussin_%28French_-_Saint_John_Baptizing_in_the_River_Jordan_-_Google_Art_Project.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/4/47/Mark%C3%B3%2C_K%C3%A1roly_-_The_Baptism_of_Christ_in_the_River_Jordan_%281840-1%29.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/5/5a/Piero_della_Francesca_-_Baptism_of_Christ_-_WGA17595.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/2/26/Joachim_Patinir_-_The_Baptism_of_Christ_-_Google_Art_Project_2.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/8/8e/The_Baptism_of_Christ_%28Verrocchio_%26_Leonardo%29.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/5/57/Almeida_J%C3%BAnior_-_Batismo_de_Jesus%2C_1895.JPG',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/The_Baptism_of_Christ_%28SM_1667%29.png/1854px-The_Baptism_of_Christ_%28SM_1667%29.png',
      ],
      'Wedding Feast at Cana': [
        'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Paolo_Veronese_008.jpg/2560px-Paolo_Veronese_008.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/7/7a/Jacopo_Tintoretto_-_Marriage_at_Cana_-_WGA22470.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/7/7f/Gerard_David_-_The_Marriage_at_Cana.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/0/08/Jan_Cossiers_-_The_wedding_at_Cana%2C_Jesus_blesses_the_water.jpg',
      ],
      'Proclamation of the Kingdom': [
        'https://upload.wikimedia.org/wikipedia/commons/9/96/Bloch-SermonOnTheMount.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/5/5b/Sermon_on_the_Mount_by_I.Makarov.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/3/3e/Cosimo_Rosselli_Sermone_della_Montagna.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/1/11/Sankt_Matthaeus_Kirke_Copenhagen_altarpiece_detail1.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/3/33/Gebhard_Fugel_Krankenheilung_1885.jpg',
      ],
      'Transfiguration': [
        'https://upload.wikimedia.org/wikipedia/commons/5/51/Transfiguration_Raphael.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/a/a5/The-Transfiguration-1480-xx-Giovanni-Bellini.JPG',
        'https://upload.wikimedia.org/wikipedia/commons/8/8a/Pietro_Perugino_cat52c.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/d/d8/Titian_Transfiguration_c1560_SanSalvador.jpg',
      ],
      'Institution of the Eucharist': [
        'https://upload.wikimedia.org/wikipedia/commons/b/bc/%C3%9Altima_Cena_-_Juan_de_Juanes.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Leonardo_da_Vinci_%281452-1519%29_-_The_Last_Supper_%281495-1498%29.jpg/2560px-Leonardo_da_Vinci_%281452-1519%29_-_The_Last_Supper_%281495-1498%29.jpg',
        'https://upload.wikimedia.org/wikipedia/en/6/60/BouveretLastSupper.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/7/79/Brooklyn_Museum_-_The_Last_Supper_Judas_Dipping_his_Hand_in_the_Dish_%28La_C%C3%A9ne._Judas_met_la_main_dans_le_plat%29_-_James_Tissot.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/4/46/Jacopo_Tintoretto_-_The_Last_Supper_-_WGA22649.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/e/e6/Valentin_de_Boulogne_-_The_Last_Supper.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/d/d2/Ecce_Agnus_Dei.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/8/8a/Adoration_du_Saint_Sacrement_%C3%A0_l%27Eglise_du_Sacr%C3%A9-Coeur_de_Monaco.jpg',
      ],
    }} />;
}

function SorrowfulMysteries() {
  return <Mystery
    name='Sorrowful'
    days={[Day.TUE, Day.FRI]}
    mysteries={{
      'Agony in the Garden': [
        { image: 'https://upload.wikimedia.org/wikipedia/commons/8/85/%27Christ_in_Gethsemane%27_by_Carl_Heinrich_Bloch%2C_1880.jpg', author: 'Carl Bloch', year: '1880' },
        'https://upload.wikimedia.org/wikipedia/commons/c/c4/Agony_in_the_Garden_by_Frans_Schwartz%2C_1898.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/5/53/Gethsemane_Carl_Bloch.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/6/68/Christ_in_Gethsemane.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/b/ba/Andrea_Mantegna_022.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Pietro_Perugino_cat20.jpg/1052px-Pietro_Perugino_cat20.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/8/80/%27Agony_in_the_Garden%27_by_Ludovico_Carracci_.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/3/38/Michelangelo_Merisi_da_Caravaggio_-_Christ_in_the_Garden_-_Colourised_by_Mikey_Angels.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/d/d4/Delacroix_-_The_Agony_in_the_Garden%2C_1824-27.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/3/34/El_Greco_-_The_Agony_in_the_Garden_-_WGA10484.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/0/08/Brandi%2C_Giacinto_-_Christ_in_the_Garden_of_Gethsemane_-_c._1650.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/1/11/Adriaen_van_de_Velde_-_Agony_in_the_Garden_-_WGA24475.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/b/b2/Gauguin-christ-in-garden.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/c/c4/Trevisani%2C_Agony_in_the_Garden.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/5/5c/The_Agony_in_the_Garden_MET_DP136373.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/1/1b/Francesco_Trevisani_%281656-1746%29_%28attributed_to%29_-_The_Agony_in_the_Garden_-_51_-_Fitzwilliam_Museum.jpg',
      ],
      'Scourging at the Pillar': [
        'https://upload.wikimedia.org/wikipedia/commons/4/47/Flagellation-of-christ-_Rubens.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/9/9f/Caravaggio_flagellation.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/f/fa/Brooklyn_Museum_-_The_Scourging_on_the_Back_%28La_flagellation_de_dos%29_-_James_Tissot.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/6/61/Guercino_Flagellazione.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/5/56/William-Adolphe_Bouguereau_%281825-1905%29_-_The_Flagellation_of_Our_Lord_Jesus_Christ_%281880%29.jpg',
      ],
      'Crowning with Thorns': [
        'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Michelangelo_Merisi%2C_called_Caravaggio_-_The_Crowning_with_Thorns_-_Google_Art_Project.jpg/2560px-Michelangelo_Merisi%2C_called_Caravaggio_-_The_Crowning_with_Thorns_-_Google_Art_Project.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/d/de/Ecce_homo_by_Antonio_Ciseri_%281%29.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/8/8f/CaravaggioCrowning01.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/6/61/Titian_-_Crowning_with_Thorns_-_WGA22806.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/2/23/Anthonis_van_Dyck_004.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/b/bf/Hieronymus_Bosch_-_Christ_Mocked_%28The_Crowning_with_Thorns%29_-_Google_Art_Project.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/8/83/Rubens_%28Ecce_Homo%29.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/0/02/Maarten_van_Heemskerck_020.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/e/ed/Caravaggio_%28Michelangelo_Merisi%29_-_Ecce_Homo_-_Google_Art_Project.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/c/c9/Titian_-_Christ_Shown_to_the_People_%28Ecce_Homo%29.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/8/8e/Munk%C3%A1csy_Ecce_Homo_part.JPG',
        'https://upload.wikimedia.org/wikipedia/commons/4/41/Tiziano_Vecelli_-_Ecce_Homo_%28National_Gallery_of_Ireland%29.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/0/0f/CigoliEcceHomo.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/7/71/Jan_Cossiers_-_Ecce_Homo.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/f/fd/ChmielowskiAdam.1881.EcceHomo.jpg',
      ],
      'Carrying of the Cross': [
        'https://upload.wikimedia.org/wikipedia/commons/a/a6/Giovanni_Battista_Tiepolo_-_Carrying_the_Cross_-_WGA22269.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/b/bb/Cristo_abrazado_a_la_cruz_El_Greco.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/b/bd/5_Andrea_di_Bartolo._Way_to_Calvary._c._1400%2C_Thissen-Bornhemisza_coll._Madrid.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/c/cb/Christ_Falling_on_the_Way_to_Calvary_-_Raphael.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/5/50/Titian%2C_Christ_Carrying_the_Cross._Oil_on_canvas%2C_67_x_77_cm%2C_c._1565._Madrid%2C_Museo_Nacional_del_Prado.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/7/7e/Sebastiano_del_Piombo_-_Christ_Carrying_the_Cross_-_WGA21099.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/a/a0/Tiziano_o_giorgione%2C_cristo_portacroce.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/f/fd/Titian_-_Christ_Carrying_the_Cross_-_WGA22830.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/f/fb/Spanish_-_Christ_Carrying_his_Cross_-_Google_Art_Project.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/2/2f/Luis_de_Morales_-_Christ_Carrying_the_Cro_-_2012.94.1_-_Yale_University_Art_Gallery.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/f/f9/Juan_S%C3%A1nchez_Cot%C3%A1n_-_Christ_Carrying_the_Cross.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/4/4e/Pieter_Bruegel_d._%C3%84._007.jpg',
      ],
      'Crucifixion': [
        'https://upload.wikimedia.org/wikipedia/commons/e/ef/Crucifixion_by_Alonso_Cano_%281636-8%2C_Hermitage%29.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/8/84/Titian_-_The_Crucifixion_of_Christ_-_109_-_Pinacoteca_civica_%22Francesco_Podesti%22.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/6/6a/The_Crucifixion_MET_DT10248.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/8/89/Lucas_Cranach_d.%C3%84._-_Kreuzigung_%281532%2C_Indianapolis_Museum_of_Art%29.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/1/17/Christ_at_the_Cross_-_Cristo_en_la_Cruz.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/5/5d/Leon_Bonnat_-_The_Crucifixion.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/0/0d/Annibale_Carracci_1560-1609_Pieta.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/2/23/Correggio_deposition.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/2/21/Pierre_Mignard%2C_Piet%C3%A0_after_Annibale_Carracci.png',
        'https://upload.wikimedia.org/wikipedia/commons/6/6b/Ludovico_Carracci_%28atr.%29%2C_Piet%C3%A0%2C_Palazzo_Barberini.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/a/ab/Caravaggio_-_La_Deposizione_di_Cristo.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Anthony_van_Dyck_-_Bewening_van_Christus_-_403_-_Royal_Museum_of_Fine_Arts_Antwerp.jpg/1510px-Anthony_van_Dyck_-_Bewening_van_Christus_-_403_-_Royal_Museum_of_Fine_Arts_Antwerp.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/2/20/Anthony_van_Dyck_-_The_lamentation_of_Christ_%28Alte_Pinakothek%29.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Anthony_van_Dyck_-_Bewening_van_Christus2.JPG/2560px-Anthony_van_Dyck_-_Bewening_van_Christus2.JPG',

      ],
    }} />;
}

function GloriousMysteries() {
  return <Mystery
    name='Glorious'
    days={[Day.WED, Day.SUN]}
    mysteries={{
      'Resurrection': [
        'https://upload.wikimedia.org/wikipedia/commons/4/45/Luca_Giordano_-_Resurrection_-_WGA09020.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/9/98/Mantegna%2C_Andrea_-_La_R%C3%A9surrection_-_1457-1459.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/b/bf/No%C3%ABl_Coypel_-_Resurrection_of_Christ_%28large_version%29.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/7/7d/The_resurrection_day.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Correggio_Noli_Me_Tangere.jpg/800px-Correggio_Noli_Me_Tangere.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/9/95/Noli_me_tangere_-_William_Brassey_Hole.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Den_vantro_Thomas.jpg/929px-Den_vantro_Thomas.jpg',
      ],
      'Ascension': [
        'https://upload.wikimedia.org/wikipedia/commons/c/cf/Gustave_Dor%C3%A9_-_L%27Ascension.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/c/c3/Obereschach_Pfarrkirche_Fresko_Fugel_Christi_Himmelfahrt_crop.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/3/3c/Rembrandt_van_Rijn_192.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/0/0f/Dosso_Dossi_022.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/8/85/Jesus_ascending_to_heaven.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/0/0b/De_Grebber-God_Inviting_Christ_to_Sit_on_the_Throne_at_His_Right_Hand.jpg',
      ],
      'Descent of the Holy Spirit': [
        'https://upload.wikimedia.org/wikipedia/commons/3/3f/Jean_II_Restout_-_Pentecost_-_WGA19318.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/6/61/La_Descente_du_Saint-Esprit%2C_par_Jacques_Blanchard.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/5/5a/Titian_-_The_Descent_of_the_Holy_Ghost_-_WGA22768.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/e/e4/Anthony_van_Dyck_-_Pentecost_-_WGA07442.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/d/d6/Mildorfer%2C_Josef_Ignaz_-_Pentecost_-_1750s.jpg',
      ],
      'Assumption of Mary': [
        'https://upload.wikimedia.org/wikipedia/commons/9/9e/Tizian_041.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Rubens%2C_Mari%C3%A4_Himmelfahrt_%28Antwerpen%29.jpg/1382px-Rubens%2C_Mari%C3%A4_Himmelfahrt_%28Antwerpen%29.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/3/37/Lorenzo_Lotto_039.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/7/7f/Andrea_del_Sarto_-_Assumption_of_the_Virgin_-_WGA00400.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Annibale_Carracci_Assumption_of_the_Virgin.jpg/753px-Annibale_Carracci_Assumption_of_the_Virgin.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Asumption_of_the_Virgin-Guido_Reni-MBA_Lyon_A123-IMG_0329.jpg/1327px-Asumption_of_the_Virgin-Guido_Reni-MBA_Lyon_A123-IMG_0329.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Guercino_-_Assumption_of_Mary_-_Hermitage.jpg/2207px-Guercino_-_Assumption_of_Mary_-_Hermitage.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/9/9a/CORRADO_GIAQUINTO_MOLFETTA_1703_-_1766_NAPLES_ASSUMPTION_OF_THE_VIRGIN.jpg',
      ],
      'Crowning of Mary as Queen of Heaven and Earth': [
        'https://catholicharboroffaithandmorals.com/Queen%20of%20Angels.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/b/b5/Diego_Vel%C3%A1zquez_-_Coronation_of_the_Virgin_-_Prado.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/d/da/Peter_Paul_Rubens_079.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/c/c8/Fra_Angelico_038.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/8/83/Fra_Angelico_081.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/f/fd/Coronation_of_the_Virgin_-_Sittow.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/1/16/Botticelli%2C_incoronazione_della_vergine.jpg',
      ],
    }} />;
}

type MysteryData = {
  image: string;
  author: string;
  year: string;
};

type Mystery = string | MysteryData;

function Mystery(attrs: { name: string, mysteries: Record<string, Mystery[]>, days: Day[] }) {
  const dayClasses = attrs.days.map(day => `show-today day-${day}`).join(' ');
  const labels = ['First', 'Second', 'Third', 'Fourth', 'Fifth'];
  return <>{Object.entries(attrs.mysteries).map(([name, hrefs], i) =>
    <Panel>
      {hrefs.map(href => {
        const data: MysteryData = typeof href === 'string' ? {
          author: '',
          year: '',
          image: href,
        } : href;

        return <>
          <div class={`half-grid highlightable-line mystery ${dayClasses}`}>
            <div class='centered'>
              <img src={data.image} loading='lazy' />
            </div>
            <div class='centered'>
              <h1>{labels[i]} {attrs.name} Mystery</h1>
              <h2>{name}</h2>
              {/* {data.author &&
                <h3>({data.author}, {data.year})</h3>
              } */}
            </div>
          </div>
        </>;
      })}
    </Panel>
  )}</>;
}

function Line(attrs: any, children: any) {
  return <span class='highlightable-line'>{children}{'\n'}</span>;
}

function Intro() {
  return <Panel>
    <div class='centered spaced-big'>
      <h1>Auxilium Christianorum</h1>
      <a href='http://auxiliumchristianorum.org/'>Official website</a>
      <p class='spaced-small'>
        <Line>Our help is in the name of the Lord.</Line>
        <Line><Red>Who made heaven and earth.</Red></Line>
      </p>
      <div>
        <p class='spaced-small'>
          <Line>Most gracious Virgin Mary,</Line>
          <Line>    thou who wouldst crush the head of the serpent,</Line>
          <Line>        protect us from the vengeance of the evil one.</Line>
        </p>
        <p class='spaced-small'>
          <Line>We offer our prayers, supplications, sufferings and good works to thee</Line>
          <Line>    so that thou may purify them, sanctify them and present them</Line>
          <Line>        to thy Son as a perfect offering.</Line>
        </p>
        <p class='spaced-small'>
          <Line>May this offering be given so that</Line>
          <Line>    the demons that influence or seek to influence the members of the Auxilium Christianorum</Line>
          <Line>        do not know the source of their expulsion and blindness.</Line>
        </p>
        <p class='spaced-small'>
          <Line>Blind them so that they know not our good works.</Line>
          <Line>    Blind them so that they know not on whom to take vengeance.</Line>
          <Line>        Blind them so that they may receive the just sentence for their works.</Line>
        </p>
        <p class='spaced-small'>
          <Line>Cover us with the Precious Blood of thy Son</Line>
          <Line>    so that we may enjoy the protection</Line>
          <Line>        which flows from His Passion and Death.</Line>
        </p>
        <p class='spaced-small'>
          <Line><Red>Amen</Red></Line>
        </p>
      </div>
    </div>
  </Panel>;
}

function Conclusion() {
  return <Panel>
    <div class='centered spaced-big'>
      <h1>Conclusion</h1>
      <p class='spaced-small'>
        <Line>August Queen of the Heavens,</Line>
        <Line>  heavenly Sovereign of the Angels,</Line>
        <Line>    Thou who from the beginning</Line>
        <Line>      hast received from God the power and the mission</Line>
        <Line>        to crush the head of Satan,</Line>
        <Line>we humbly beseech Thee to send thy holy legions,</Line>
        <Line>  so that under Thy command and through Thy power,</Line>
        <Line>    they may pursue the demons</Line>
        <Line>      and combat them everywhere,</Line>
        <Line>        suppress their boldness,</Line>
        <Line>          and drive them back into the abyss.</Line>
        <Line>O good and tender Mother,</Line>
        <Line>  Thou wilt always be our love and hope!</Line>
        <Line>    O Divine Mother, send Thy Holy Angels to defend us</Line>
        <Line>      and to drive far away from us the cruel enemy.</Line>
        <Line>        Holy Angels and Archangels, defend us, guard us.</Line>
        <Line>Amen.</Line>
      </p>
      <p class='spaced-small two-cols'>
        <Line>Most Sacred Heart of Jesus, <Red>have mercy on us.</Red></Line>
        <Line>Mary, Help of Christians, <Red>pray for us.</Red></Line>
        <Line>Virgin Most Powerful, <Red>pray for us.</Red></Line>
        <Line>St. Joseph, <Red>pray for us.</Red></Line>
        <Line>St. Michael the Archangel, <Red>pray for us.</Red></Line>
        <Line>All You Holy Angels, <Red>pray for us.</Red></Line>
      </p>
      <p class='spaced-small'>
        <Line><Red>In the name of the Father, the Son and the Holy Spirit. Amen.</Red></Line>
      </p>
    </div>
  </Panel>;
}

function MorningPrayers() {
  return <Panel>
    <div class='centered spaced-big'>
      <h1>Morning Prayers</h1>
      <p class='spaced-small'>
        <Line>Dear Lord, thank you for today.</Line>
        <Line>    Bless our family,</Line>
        <Line>        [name all the members].</Line>
        <br />
        <Line>Have mercy on us</Line>
        <Line>    forgive us our sins</Line>
        <Line>        and bring us to everlasting life.</Line>
        <br />
        <Line>Unblind us from all spiritual blindness</Line>
        <Line>    soften our hardened hearts</Line>
        <Line>        and free us from all slavery to sin.</Line>
        <br />
        <Line>Protect us from</Line>
        <Line>    the world, the devil, and the flesh</Line>
        <Line>        and the seven deadly sins.</Line>
        <br />
        <Line>Fill us with faith,</Line>
        <Line>    hope,</Line>
        <Line>        and love.</Line>
        <br />
        <Line>Help us to love you,</Line>
        <Line>    know you,</Line>
        <Line>        and serve you.</Line>
        <br />
        <Line>Help us to love you</Line>
        <Line>    with our whole heart, mind, soul, and strength</Line>
        <Line>        because you are all good and deserve all our love.</Line>
        <br />
        <Line>Help us to do our prayers</Line>
        <Line>    holy reading</Line>
        <Line>        and devotions.</Line>
        <br />
        <Line><Red>Amen</Red></Line>
      </p>
    </div>
  </Panel>;
}

function LitanyOfSaints() {
  return <Panel>
    <div class='centered spaced-big'>
      <h1>Litany of Saints</h1>
      <div class='spaced-small two-cols'>
        <Line>St. Jane Frances de Chantal <Red>Pray for us.</Red></Line>
        <Line> St. Kateri Tekakwitha <Red>Pray for us.</Red></Line>
        <Line>  St. Peter the Apostle <Red>Pray for us.</Red></Line>
        <div class='spaced-small' />
        <Line>St. Therese of Lisieux <Red>Pray for us.</Red></Line>
        <Line> St. John Bosco <Red>Pray for us.</Red></Line>
        <Line>  St. Joan of Arc <Red>Pray for us.</Red></Line>
        <div class='spaced-small' />
        <Line>St. Teresa of Avila <Red>Pray for us.</Red></Line>
        <Line> St. Catherine of Siena <Red>Pray for us.</Red></Line>
        <Line>  St. Rose of Lima <Red>Pray for us.</Red></Line>
        <div class='spaced-small' />
        <Line>St. John Paul II <Red>Pray for us.</Red></Line>
        <div class='spaced-small' />
        <Line>St. Cecilia <Red>Pray for us.</Red></Line>
        <Line> St. Philomena <Red>Pray for us.</Red></Line>
        <Line>  St. Jude <Red>Pray for us.</Red></Line>
        <div class='spaced-small' />
        <Line>St. Augustine <Red>Pray for us.</Red></Line>
        <Line> St. Benedict <Red>Pray for us.</Red></Line>
        <Line>  St. Francis of Assisi <Red>Pray for us.</Red></Line>
        <div class='spaced-small' />
        <Line>St. Monica <Red>Pray for us.</Red></Line>
        <Line> St. Rita <Red>Pray for us.</Red></Line>
        <Line>  St. Dymphna <Red>Pray for us.</Red></Line>
        <div class='spaced-small' />
        <Line>St. Francis de Sales <Red>Pray for us.</Red></Line>
        <Line> St. Vincent de Paul <Red>Pray for us.</Red></Line>
        <Line>  St. Thomas More <Red>Pray for us.</Red></Line>
      </div>
      <div class='spaced-small two-cols'>
        <Line>All our Patron Saints <Red>Pray for us.</Red></Line>
        <Line> All our Guardian Angels <Red>Pray for us.</Red></Line>
        <Line>  All the Holy Souls in Purgatory <Red>Pray for us.</Red></Line>
      </div>
      <p class='spaced-small two-cols'>
        <Line>Most Chaste Heart of Blessed St. Joseph <Red>Pray for us.</Red></Line>
        <Line> Most Immaculate Heart of the Blessed Virgin Mary <Red>Pray for us.</Red></Line>
        <Line>  Most Sacred Heart of Jesus <Red>Have mercy on us.</Red></Line>
        <Line>   Most Sacred Heart of Jesus <Red>Have mercy on us.</Red></Line>
        <Line>    Most Sacred Heart of Jesus <Red>Have mercy on us.</Red></Line>
      </p>
    </div>
  </Panel>;
}

function Sunday() {
  return <Panel>
    <div class='centered spaced-big show-today day-0'>
      <h1>Sunday</h1>
      <p class='spaced-small'>
        <Line>O Glorious Queen of Heaven and Earth,</Line>
        <Line>    Virgin Most Powerful,</Line>
        <Line>    thou who hast the power</Line>
        <Line>    to crush the head of the ancient serpent with thy heel,</Line>
        <Line>        come and exercise this power</Line>
        <Line>        flowing from the grace of thine Immaculate Conception.</Line>
        <Line>Shield us under the mantle of thy purity and love,</Line>
        <Line>    draw us into the sweet abode of thy heart</Line>
        <Line>    and annihilate and render impotent</Line>
        <Line>        the forces bent on destroying us.</Line>
        <Line>Come Most Sovereign Mistress of the Holy Angels</Line>
        <Line>    and Mistress of the Most Holy Rosary, </Line>
        <Line>    thou who from the very beginning hast received from God</Line>
        <Line>        the power and the mission to crush the head of Satan.</Line>
        <Line>Send forth thy holy legions, we humbly beseech thee,</Line>
        <Line>    that under thy command and by thy power</Line>
        <Line>    they may pursue the evil spirits,</Line>
        <Line>    counter them on every side,</Line>
        <Line>    resist their bold attacks</Line>
        <Line>    and drive them far from us,</Line>
        <Line>        harming no one on the way,</Line>
        <Line>        binding them to the foot of the Cross</Line>
        <Line>            to be judged and sentenced by Jesus Christ Thy Son</Line>
        <Line>            and to be disposed of by Him as He wills.</Line>
        <br />
        <Line>St. Joseph, Patron of the Universal Church,</Line>
        <Line>    come to our aid in this grave battle</Line>
        <Line>    against the forces of darkness,</Line>
        <Line>repel the attacks of the devil</Line>
        <Line>    and free the members of the Auxilium Christianorum,</Line>
        <Line>    and those for whom the priests of the Auxilium Christianorum pray,</Line>
        <Line>        from the strongholds of the enemy.</Line>
        <br />
        <Line>St. Michael, summon the entire heavenly court</Line>
        <Line>    to engage their forces in this fierce battle</Line>
        <Line>        against the powers of hell.</Line>
        <Line>Come O Prince of Heaven</Line>
        <Line>    with thy mighty sword</Line>
        <Line>    and thrust into hell</Line>
        <Line>        Satan and all the other evil spirits.</Line>
        <Line>O Guardian Angels,</Line>
        <Line>    guide and protect us.</Line>
        <Line>Amen.</Line>
      </p>
    </div>
  </Panel>;
}

function Monday() {
  return <Panel>
    <div class='centered spaced-big show-today day-1'>
      <h1>Monday</h1>
      <p class='spaced-small'>
        <Line>In Thy name, Lord Jesus Christ,</Line>
        <Line>  we pray that Thou cover</Line>
        <Line>    us, our families, and all of our possessions</Line>
        <Line>      with Thy love and Thy Most Precious Blood</Line>
        <Line>        and surround us with</Line>
        <Line>          Thy Heavenly Angels, Saints</Line>
        <Line>            and the mantle of Our Blessed Mother.</Line>
        <Line>              Amen.</Line>
      </p>
    </div>
  </Panel>;
}

function Tuesday() {
  return <Panel>
    <div class='centered spaced-big show-today day-2'>
      <h1>Tuesday</h1>
      <p class='spaced-small'>
        <Line>Lord Jesus Christ, we beg Thee for the grace</Line>
        <Line>  to remain guarded beneath the protective mantle of Mary,</Line>
        <Line>    surrounded by the holy briar from which was taken the Holy Crown of Thorns,</Line>
        <Line>      and saturated with Thy Precious Blood</Line>
        <Line>        in the power of the Holy Spirit,</Line>
        <Line>          with our Guardian Angels,</Line>
        <Line>            for the greater glory of the Father.</Line>
        <Line>              Amen.</Line>
      </p>
    </div>
  </Panel>;
}

function Wednesday() {
  return <Panel>
    <div class='centered spaced-big show-today day-3'>
      <h1>Wednesday</h1>
      <div>
        <p class='spaced-small'>
          <Line>In the Name of Jesus Christ, Our Lord and God,</Line>
          <Line>    we ask Thee to render all spirits</Line>
          <Line>        impotent, paralyzed and ineffective</Line>
        </p>
        <p class='spaced-small'>
          <Line>in attempting to take revenge against</Line>
          <Line>    anyone of the members of the Auxilium Christianorum,</Line>
          <Line>    our families, friends, communities,</Line>
          <Line>    those who pray for us and their family members,</Line>
          <Line>    or anyone associated with us</Line>
          <Line>    and for whom the priests of the Auxilium Christianorum pray.</Line>
        </p>
        <p class='spaced-small'>
          <Line>We ask Thee to bind all evil spirits,</Line>
          <Line>    all powers in the air, the water, the ground, the fire, under ground,</Line>
          <Line>        or wherever they exercise their powers,</Line>
          <Line>    any satanic forces in nature</Line>
          <Line>        and any and all emissaries of the satanic headquarters.</Line>
        </p>
        <p class='spaced-small'>
          <Line>We ask Thee to bind by Thy Precious Blood</Line>
          <Line>    all of the attributes, aspects and characteristics,</Line>
          <Line>    interactions, communications and deceitful games</Line>
          <Line>        of the evil spirits.</Line>
        </p>
        <p class='spaced-small'>
          <Line>We ask Thee to break any and all</Line>
          <Line>    bonds, ties and attachments</Line>
          <Line><Red>in the Name of the Father,</Red></Line>
          <Line><Red>    and of the Son</Red></Line>
          <Line><Red>        and of the Holy Spirit.</Red></Line>
        </p>
        <p class='spaced-small'>
          <Line><Red>Amen.</Red></Line>
        </p>
      </div>
    </div>
  </Panel>;
}

function Thursday() {
  return <Panel>
    <div class='centered spaced-big show-today day-4'>
      <h1>Thursday</h1>
      <p class='spaced-small'>
        <Line>My Lord,</Line>
        <Line>  Thou art all powerful,</Line>
        <Line>    Thou art God,</Line>
        <Line>      Thou art our Father.</Line>
        <Line>We beg Thee through the intercession and help</Line>
        <Line>  of the Archangels Sts. Michael, Raphael, and Gabriel</Line>
        <Line>    for the deliverance of our brothers and sisters</Line>
        <Line>      who are enslaved by the evil one.</Line>
        <Line>All Saints of Heaven,</Line>
        <Line>  come to our aid.</Line>
      </p>
      <p class='two-cols spaced-small'>
        <Line>From anxiety, sadness and obsessions, <Red>We implore Thee, deliver us, O Lord.</Red></Line>
        <Line>From hatred, fornication, and envy, <Red>We implore Thee, deliver us, O Lord.</Red></Line>
        <Line>From thoughts of jealousy, rage, and death, <Red>We implore Thee, deliver us, O Lord.</Red></Line>
        <Line>From every thought of suicide and abortion, <Red>We implore Thee, deliver us, O Lord.</Red></Line>
        <Line>From every form of sinful sexuality, <Red>We implore Thee, deliver us, O Lord.</Red></Line>
        <Line>From every division in our family, and every harmful friendship, <Red>We implore Thee, deliver us, O Lord.</Red></Line>
        <Line>From every sort of spell, malefice, witchcraft, and every form of the occult, <Red>We implore Thee, deliver us, O Lord.</Red></Line>
      </p>
      <p class='spaced-small'>
        <Line>Thou who said, "Peace I leave with you, my peace I give unto you."</Line>
        <Line>  Grant that, through the intercession of the Virgin Mary,</Line>
        <Line>    we may be liberated from every demonic influence</Line>
        <Line>      and enjoy Thy peace always.</Line>
        <Line>        In the Name of Christ, our Lord.</Line>
        <Line><Red>Amen.</Red></Line>
      </p>
    </div>
  </Panel>;
}

function Friday() {
  return <Panel>
    <div class='centered spaced-big show-today day-5'>
      <h1>Friday</h1>
      <h2>Litany of Humility</h2>
      <p class='two-cols spaced-small'>
        <Line>O Jesus meek and humble, <Red>hear me.</Red></Line>
      </p>
      <p class='two-cols spaced-small'>
        <Line>From the desire of being esteemed, <Red>deliver me Jesus.</Red></Line>
        <Line>From the desire of being loved, <Red>deliver me Jesus.</Red></Line>
        <Line>From the desire of being extolled, <Red>deliver me Jesus.</Red></Line>
        <Line>From the desire of being honored, <Red>deliver me Jesus.</Red></Line>
        <Line>From the desire of being praised, <Red>deliver me Jesus.</Red></Line>
        <Line>From the desire of being preferred to others, <Red>deliver me Jesus.</Red></Line>
        <Line>From the desire of being consulted, <Red>deliver me Jesus.</Red></Line>
        <Line>From the desire of being approved, <Red>deliver me Jesus.</Red></Line>
      </p>
      <p class='two-cols spaced-small'>
        <Line>From the fear of being humiliated, <Red>deliver me Jesus.</Red></Line>
        <Line>From the fear of being despised, <Red>deliver me Jesus.</Red></Line>
        <Line>From the fear of suffering rebukes, <Red>deliver me Jesus.</Red></Line>
        <Line>From the fear of being calumniated, <Red>deliver me Jesus.</Red></Line>
        <Line>From the fear of being forgotten, <Red>deliver me Jesus.</Red></Line>
        <Line>From the fear of being ridiculed, <Red>deliver me Jesus.</Red></Line>
        <Line>From the fear of being wronged, <Red>deliver me Jesus.</Red></Line>
        <Line>From the fear of being suspected, <Red>deliver me Jesus.</Red></Line>
      </p>
      <p class='two-cols spaced-small'>
        <Line>That others may be loved more than I, <Red>Jesus, grant me the grace to desire it.</Red></Line>
        <Line>That others may be esteemed more than I, <Red>Jesus, grant me the grace to desire it.</Red></Line>
        <Line>That in the opinion of the world, others may increase and I may decrease, <Red>Jesus, grant me the grace to desire it.</Red></Line>
        <Line>That others may be chosen and I set aside, <Red>Jesus, grant me the grace to desire it.</Red></Line>
        <Line>That others may be praised and I go unnoticed, <Red>Jesus, grant me the grace to desire it.</Red></Line>
        <Line>That others may be preferred to me in everything, <Red>Jesus, grant me the grace to desire it.</Red></Line>
        <Line>That others may become holier than I, provided that I become as holy as I should, <Red>Jesus, grant me the grace to desire it.</Red></Line>
      </p>
    </div>
  </Panel>;
}

function Saturday() {
  return <Panel>
    <div class='centered spaced-big show-today day-6'>
      <h1>Saturday</h1>
      <p class='spaced-small'>
        <Line>O God and Father of our Lord Jesus Christ,</Line>
        <Line>  we call upon Thy holy Name</Line>
        <Line>    and humbly beseech Thy clemency,</Line>
        <Line>that, through the intercession</Line>
        <Line>  of the ever immaculate Virgin, our Mother Mary,</Line>
        <Line>    and of the glorious Archangel Saint Michael,</Line>
        <Line>thou wouldst vouchsafe to help us against Satan</Line>
        <Line>  and all the other unclean spirits</Line>
        <Line>    that are prowling about the world</Line>
        <Line>      to the great peril of the human race</Line>
        <Line>        and the loss of souls.</Line>
        <Line><Red>Amen.</Red></Line>
      </p>
    </div>
  </Panel>;
}

function LitanyOfThePreciousBlood() {
  return <Panel>
    <div class='centered spaced-big' id='litany'>

      <h1>Litany of the Precious Blood</h1>

      <div class='two-cols spaced-small'>
        <Line>Lord have mercy, <Red>Lord have mercy.</Red></Line>
        <Line>Christ have mercy, <Red>Christ have mercy.</Red></Line>
        <Line>Lord have mercy, <Red>Lord have mercy.</Red></Line>
        <div class='spaced-mini' />
        <Line>Christ hear us, <Red>Christ graciously hear us.</Red></Line>
      </div>

      <div class='two-cols spaced-small'>
        <Line>God the Father of Heaven, <Red>have mercy on us.</Red></Line>
        <Line>God the Son, Redeemer of the world, <Red>have mercy on us.</Red></Line>
        <Line>God the Holy Spirit, <Red>have mercy on us.</Red></Line>
        <div class='spaced-mini' />
        <Line>Holy Trinity, One God, <Red>have mercy on us.</Red></Line>
      </div>

      <div class='two-cols spaced-small'>
        <Line>Blood of Christ, only-begotten Son of the Eternal Father, <Red>save us.</Red></Line>
        <Line>Blood of Christ, Incarnate Word of God, <Red>save us.</Red></Line>
        <Line>Blood of Christ, of the New and Eternal Testament, <Red>save us.</Red></Line>
        <div class='spaced-mini' />
        <Line>Blood of Christ, falling upon the earth in the Agony, <Red>save us.</Red></Line>
        <Line>Blood of Christ, shed profusely in the Scourging, <Red>save us.</Red></Line>
        <Line>Blood of Christ, flowing forth in the Crowning with Thorns, <Red>save us.</Red></Line>
        <div class='spaced-mini' />
        <Line>Blood of Christ, poured out on the Cross, <Red>save us.</Red></Line>
        <Line>Blood of Christ, price of our salvation, <Red>save us.</Red></Line>
        <Line>Blood of Christ, without which there is no forgiveness, <Red>save us.</Red></Line>
        <div class='spaced-mini' />
        <Line>Blood of Christ, Eucharistic drink and refreshment of souls, <Red>save us.</Red></Line>
        <Line>Blood of Christ, stream of mercy, <Red>save us.</Red></Line>
        <Line>Blood of Christ, victor over demons, <Red>save us.</Red></Line>
        <div class='spaced-mini' />
        <Line>Blood of Christ, courage of Martyrs, <Red>save us.</Red></Line>
        <Line>Blood of Christ, strength of Confessors, <Red>save us.</Red></Line>
        <Line>Blood of Christ, bringing forth Virgins, <Red>save us.</Red></Line>
        <div class='spaced-mini' />
        <Line>Blood of Christ, help of those in peril, <Red>save us.</Red></Line>
        <Line>Blood of Christ, relief of the burdened, <Red>save us.</Red></Line>
        <Line>Blood of Christ, solace in sorrow, <Red>save us.</Red></Line>
        <div class='spaced-mini' />
        <Line>Blood of Christ, hope of the penitent, <Red>save us.</Red></Line>
        <Line>Blood of Christ, consolation of the dying, <Red>save us.</Red></Line>
        <Line>Blood of Christ, peace and tenderness of hearts, <Red>save us.</Red></Line>
        <div class='spaced-mini' />
        <Line>Blood of Christ, pledge of eternal life, <Red>save us.</Red></Line>
        <Line>Blood of Christ, freeing souls from purgatory, <Red>save us.</Red></Line>
        <Line>Blood of Christ, most worthy of all glory and honor, <Red>save us.</Red></Line>
      </div>

      <div class='two-cols spaced-small'>
        <Line>Lamb of God, Who takest away the sins of the world, <Red>spare us, O Lord.</Red></Line>
        <Line>Lamb of God, Who takest away the sins of the world, <Red>graciously hear us, O Lord.</Red></Line>
        <Line>Lamb of God, Who takest away the sins of the world, <Red>have mercy on us.</Red></Line>
      </div>

      <p class='spaced-small'>
        <Line>Thou hast redeemed us with Thy Blood, O Lord.</Line>
        <Line><Red>And made of us a kingdom for our God.</Red></Line>
      </p>

      <p class='spaced-medium' style='text-align:center; font-style:italic'><Line>Let us pray.</Line></p>

      <p class='spaced-small'>
        <Line>Almighty, and everlasting God,</Line>
        <Line>  Who hast appointed Thine only-begotten Son</Line>
        <Line>    to be the Redeemer of the world,</Line>
        <Line>      and hast been pleased to be reconciled unto us by His Blood,</Line>
        <Line>  grant us, we beseech Thee,</Line>
        <Line>    so to venerate with solemn worship</Line>
        <Line>      the price of our salvation,</Line>
        <Line>  that the power thereof</Line>
        <Line>    may here on earth keep us from all things hurtful,</Line>
        <Line>      and the fruit of the same may gladden us for ever hereafter in heaven.</Line>
        <Line>Through the same Christ our Lord.</Line>
        <Line>  <Red>Amen.</Red></Line>
      </p>
    </div>
  </Panel>;
}

function AngelMorning() {
  return <Prayer img="https://upload.wikimedia.org/wikipedia/commons/1/1e/Bernhard_Plockhorst_-_Schutzengel.jpg">
    <h1>Guardian Angel Prayer</h1>
    <Line>Angel of God,</Line>
    <Line>    my Guardian dear</Line>
    <Line>        To Whom God's love</Line>
    <Line>            commits me here</Line>
    <Line>Ever this day</Line>
    <Line>    be at my side</Line>
    <Line>        To light and guard,</Line>
    <Line>            to rule and guide</Line>
    <Line>Amen</Line>
  </Prayer>;
}

function AngelNight() {
  return <Prayer img="https://upload.wikimedia.org/wikipedia/commons/0/0c/Fridolin_Leiber_-_Schutzengel.jpg">
    <h1>Guardian Angel Prayer</h1>
    <Line>Angel of God,</Line>
    <Line>    my Guardian dear</Line>
    <Line>        To Whom God's love</Line>
    <Line>            commits me here</Line>
    <Line>Ever this night</Line>
    <Line>    be at my side</Line>
    <Line>        To light and guard,</Line>
    <Line>            to rule and guide</Line>
    <Line>Amen</Line>
  </Prayer>;
}

function OurFather() {
  return <Prayer img="https://upload.wikimedia.org/wikipedia/commons/e/ef/Crucifixion_by_Alonso_Cano_%281636-8%2C_Hermitage%29.jpg">
    <h1>Our Father</h1>
    <Line>Our Father</Line>
    <Line>    Who art in Heaven</Line>
    <Line>        Hallowed be Thy Name</Line>
    <Line>    Thy Kingdome come</Line>
    <Line>        Thy Will be done</Line>
    <Line>            On Earth as it is in Heaven</Line>
    <Line>    Give us this day our daily bread</Line>
    <Line>        And forgive us our trespasses</Line>
    <Line>            As we forgive those who trespass against us</Line>
    <Line>    And lead us not into temptation</Line>
    <Line>        But deliver us from evil</Line>
    <Line>Amen</Line>
  </Prayer>;
}

function HailMary() {
  return <Prayer img="https://upload.wikimedia.org/wikipedia/commons/c/c8/William-Adolphe_Bouguereau_%281825-1905%29_-_The_Madonna_of_the_Roses_%281903%29.jpg">
    <h1>Hail Mary</h1>
    <Line>Hail Mary</Line>
    <Line>    Full of Grace</Line>
    <Line>        The Lord is with thee</Line>
    <Line>    Blessed art thou among women</Line>
    <Line>        And blessed is the fruit of thy womb, Jesus</Line>
    <Line>    Holy Mary, Mother of God</Line>
    <Line>        Pray for us sinners now</Line>
    <Line>            And at the hour of our death</Line>
    <Line>Amen</Line>
  </Prayer>;
}

function GloryBe() {
  return <Prayer img="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Bartolom%C3%A9_Esteban_Murillo_-_The_Heavenly_and_Earthly_Trinities_-_1681-82.jpg/1411px-Bartolom%C3%A9_Esteban_Murillo_-_The_Heavenly_and_Earthly_Trinities_-_1681-82.jpg">
    <h1>Glory be</h1>
    <Line>Glory be</Line>
    <Line>    To the Father</Line>
    <Line>    And to the Son</Line>
    <Line>    And to the Holy Spirit</Line>
    <Line>As it was</Line>
    <Line>    In the beginning</Line>
    <Line>    Is now</Line>
    <Line>    And ever shall be</Line>
    <Line>        World without end</Line>
    <Line>Amen</Line>
  </Prayer>;
}

function PreciousBlood() {
  return <Prayer img="https://upload.wikimedia.org/wikipedia/commons/b/b5/Divine_Mercy.jpeg">
    <h1>St. Gertrude Prayer</h1>
    <Line>Eternal Father</Line>
    <Line>    I offer Thee</Line>
    <Line>        The Most Precious Blood</Line>
    <Line>        Of Thy Divine Son, Jesus</Line>
    <Line>    In union with</Line>
    <Line>        The Masses said</Line>
    <Line>        Throughout the world today</Line>
    <Line>    For</Line>
    <Line>        All the Holy Souls in Purgatory</Line>
    <Line>        For sinners everywhere</Line>
    <Line>        For sinners in the universal Church</Line>
    <Line>        Those in my own home</Line>
    <Line>        And within my family</Line>
    <Line>Amen</Line>
  </Prayer>;
}

function SaintMichael() {
  return <Prayer img="https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Guido_Reni_031.jpg/684px-Guido_Reni_031.jpg">
    <h1>St. Michael Prayer</h1>
    <Line>St. Michael the Archangel</Line>
    <Line>    Defend us in battle</Line>
    <Line>        Be our protection against</Line>
    <Line>        The wickedness and snares</Line>
    <Line>        Of the devil</Line>
    <Line>            May God rebuke him</Line>
    <Line>            We humbly pray</Line>
    <Line>    And do thou</Line>
    <Line>        O Prince of the Heavenly Hosts</Line>
    <Line>        By the power of God</Line>
    <Line>        Cast into Hell</Line>
    <Line>            Satan, and all the evil spirits</Line>
    <Line>            Who prowl about the world</Line>
    <Line>            Seeking the ruin of souls</Line>
    <Line>Amen</Line>
  </Prayer>;
}

function ApostlesCreed() {
  return <Prayer img="https://upload.wikimedia.org/wikipedia/commons/6/61/Disputa_del_Sacramento_%28Rafael%29.jpg">
    <h1>Apostle's Creed</h1>
    <Line>I believe in God</Line>
    <Line>  The Father Almighty</Line>
    <Line>    Creator of Heaven and Earth</Line>
    <Line>And in Jesus Christ</Line>
    <Line>  His only Son, Our Lord,</Line>
    <Line>    Who was conceived by the Holy Spirit</Line>
    <Line>      Born of the Virgin Mary</Line>
    <Line>  Suffered under Pontius Pilate</Line>
    <Line>    Was crucified, died, and was buried</Line>
    <Line>      He descended into Hell</Line>
    <Line>  On the third day he rose again from the dead</Line>
    <Line>    He ascended into Heaven</Line>
    <Line>      And is seated at the right hand of God the Father Almighty</Line>
    <Line>        From thence he shall come to judge the living and the dead</Line>
    <Line>I believe in the Holy Spirit</Line>
    <Line>  The Holy Catholic Church</Line>
    <Line>    The communion of Saints</Line>
    <Line>  The forgiveness of sins</Line>
    <Line>    The resurrection of the body</Line>
    <Line>      And life everlasting</Line>
    <Line>Amen.</Line>
  </Prayer>;
}

function HailHolyQueen() {
  return <Prayer img="https://upload.wikimedia.org/wikipedia/commons/b/b5/Diego_Vel%C3%A1zquez_-_Coronation_of_the_Virgin_-_Prado.jpg">
    <h1>Hail Holy Queen</h1>
    <Line>Hail Holy Queen</Line>
    <Line>  Mother of mercy</Line>
    <Line>    Our life, our sweetness, and our hope</Line>
    <Line>To thee to we cry, poor bashished children of Eve</Line>
    <Line>  To the do we send up our sighs, mourning, and weeping</Line>
    <Line>    In this valley of tears</Line>
    <Line>Turn then most gracious advocate</Line>
    <Line>  Thine eyes of mercy towards us</Line>
    <Line>    And after this our exile</Line>
    <Line>      Show unto us the Blessed Fruit of Thy Womb Jesus</Line>
    <Line>Oh clement, oh loving, oh sweet Virgin Mary</Line>
    <Line>  Pray for us, O Holy Mother of God</Line>
    <Line>    That we may be worthy of the promises of Christ</Line>
    <Line>Amen.</Line>
  </Prayer>;
}

function RosaryPrayer() {
  return <Prayer img="https://upload.wikimedia.org/wikipedia/commons/e/e8/2017-03_Brescia_Mattes_Pana_%28111%29.JPG">
    <h1>Rosary End Prayer</h1>
    <Line>Oh God, Whose Only Begotten Son</Line>
    <Line>  By his Life, Death, and Resurrection</Line>
    <Line>    Has purchased for us the rewards of Eternal Life</Line>
    <Line>Grant us, we beseech thee</Line>
    <Line>  That by meditating upon these mysteries</Line>
    <Line>    Of the most holy rosary</Line>
    <Line>      Of the Blessed Virgin Mary</Line>
    <Line>        We may imitate what they contain</Line>
    <Line>          And obtain what they promise</Line>
    <Line>            Through the same Christ, Our Lord</Line>
    <Line>Amen</Line>
  </Prayer>;
}

function Memorare() {
  return <Prayer img='https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Inmaculada_Concepci%C3%B3n_%28Tiepolo%29.jpg/539px-Inmaculada_Concepci%C3%B3n_%28Tiepolo%29.jpg'>
    <h1>Memorare</h1>
    <Line>Remember O Most Gracious Virgin Mary</Line>
    <Line>    That never was it known</Line>
    <Line>    That anyone</Line>
    <Line>    Who fled to thy protection</Line>
    <Line>    Implored thy help</Line>
    <Line>    Or sought thine intercession</Line>
    <Line>        Was left unaided</Line>
    <Line>Inspired by this confidence</Line>
    <Line>    I fly unto thee</Line>
    <Line>    O Virgin of Virgins</Line>
    <Line>        My Mother</Line>
    <Line>To thee do I come</Line>
    <Line>    Before thee I stand</Line>
    <Line>    Sinful and sorrowful</Line>
    <Line>O Mother of the Word Incarnate</Line>
    <Line>    Despise not my petition</Line>
    <Line>    But in thy mercy</Line>
    <Line>        Hear and answer me</Line>
    <Line>Amen</Line>
  </Prayer>;
}

function HolyFamilyPrayer() {
  return <Prayer img='https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Bartolom%C3%A9_Esteban_Murillo_-_The_Heavenly_and_Earthly_Trinities_-_1681-82.jpg/1411px-Bartolom%C3%A9_Esteban_Murillo_-_The_Heavenly_and_Earthly_Trinities_-_1681-82.jpg'>
    <Line>Holy Family</Line>
    <Line>    Save our family</Line>
    <Line>        Amen</Line>
  </Prayer>;
}

function Prayer(attrs: { img: string }, children: any) {
  return (
    <Panel>
      <div class='half-grid'>
        <div class='centered'>
          <img src={attrs.img} alt="" loading='lazy' />
        </div>
        <div class='centered'>
          {children}
        </div>
      </div>
    </Panel>
  );
}

function Red(attrs: any, children: any) {
  return <span class='red'>{children}</span>;
}

function Panel(attrs: any, children: any) {
  return <div class="panel">
    <div class='panel-body'>
      {children}
    </div>
  </div>;
}

function Slideshow(attrs: any, children: any) {
  return <div class="slideshow">
    {children}
  </div>;
}

function Tabs(attrs: { tabs: Record<string, JSX.Element> }) {
  return <>
    <div id='tab-container'>

      <SiteHeader image='/img/page/home.jpg' page='Prayers' title={
        <h1 id='tabs-names' class='tab-links'>
          {Object.keys(attrs.tabs).map(title => (
            <a href='#'>{title}</a>
          ))}
        </h1> as string
      } />

      <div id='tabs-bodies'>
        {Object.values(attrs.tabs)}
      </div>

    </div>
  </>;
}
