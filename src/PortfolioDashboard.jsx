import React, { useState, useMemo, useEffect } from 'react';

const RAW_DATA = {"OCAK":{"report_date":"31.01.2026","sheet_name":"OCAK","display_name":"Ocak","summary":[{"category":"📈 Hisse Senetleri","value_try":242539.92,"pct":0.23855996049892542,"platform":"Midas","comment":"18 pozisyon, BIST","clean_name":"Hisse Senetleri","key":"hisse"},{"category":"📊 Yatırım Fonları","value_try":342105.8993852848,"pct":0.33649211166476384,"platform":"İş B./Midas","comment":"44 fon","clean_name":"Yatırım Fonları","key":"fon"},{"category":"🥇 Fiziki Altın","value_try":404516.33,"pct":0.39787841814234237,"platform":"Midas","comment":"Çeyrek (25) + Bilezik (2)","clean_name":"Fiziki Altın","key":"altin"},{"category":"🔗 Bitcoin","value_try":4683.06,"pct":0.004606213313726242,"platform":"Midas","comment":"0.00136 BTC","clean_name":"Bitcoin","key":"bitcoin"},{"category":"🌐 VOO (S&P 500 ETF)","value_try":22838.05755,"pct":0.022463296380242005,"platform":"Midas","comment":"$636.22","clean_name":"VOO (S&P 500 ETF)","key":"voo"}],"total_try":1016683.266935285,"stocks":[{"code":"CLEBI","name":"Çelebi Hava Servisi","qty":3.0,"avg_cost":1464.0,"pnl":1065.0,"market_value_try":5457.0,"price":1819.0,"sector":"Havacılık","platform":"Midas","pct":0.005367453343114139},{"code":"MGROS","name":"Migros Ticaret","qty":8.0,"avg_cost":507.01,"pnl":1039.91,"market_value_try":5096.0,"price":637.0,"sector":"Perakende","platform":"Midas","pct":0.005012377173631968},{"code":"SISE","name":"Türkiye Şişe ve Cam","qty":842.0,"avg_cost":41.18,"pnl":3635.46,"market_value_try":38311.0,"price":45.5,"sector":"Cam/Sanayi","platform":"Midas","pct":0.037682335537483194},{"code":"EREGL","name":"Ereğli Demir ve Çeli","qty":522.0,"avg_cost":24.57,"pnl":1886.8,"market_value_try":14709.96,"price":28.18,"sector":"Metal","platform":"Midas","pct":0.014468576869905674},{"code":"ENJSA","name":"Enerjisa Enerji","qty":151.0,"avg_cost":80.99,"pnl":3580.35,"market_value_try":15809.7,"price":104.7,"sector":"Enerji","platform":"Midas","pct":0.015550270683274988},{"code":"LOGO","name":"Logo Yazılım","qty":12.0,"avg_cost":149.47,"pnl":188.8,"market_value_try":1982.4,"price":165.20000000000002,"sector":"Teknoloji","platform":"Midas","pct":0.0019498698016106781},{"code":"FROTO","name":"Ford Otomotiv","qty":30.0,"avg_cost":90.09,"pnl":708.22,"market_value_try":3411.0,"price":113.7,"sector":"Otomotiv","platform":"Midas","pct":0.0033550271858827797},{"code":"TTRAK","name":"Türk Traktör ve Zira","qty":24.0,"avg_cost":529.17,"pnl":1520.0,"market_value_try":14220.0,"price":592.5,"sector":"Tarım Mak.","platform":"Midas","pct":0.013986656869907103},{"code":"AKSA","name":"Aksa Akrilik Kimya","qty":238.0,"avg_cost":10.49,"pnl":139.69,"market_value_try":2637.04,"price":11.08,"sector":"Kimya","platform":"Midas","pct":0.0025937674846849383},{"code":"ISMEN","name":"İş Yatırım Menkul De","qty":727.0,"avg_cost":40.75,"pnl":5311.2,"market_value_try":34939.62,"price":48.06,"sector":"Finans","platform":"Midas","pct":0.034366278207098706},{"code":"VESBE","name":"Vestel Beyaz Eşya","qty":649.0,"avg_cost":8.97,"pnl":-471.9,"market_value_try":5347.76,"price":8.24,"sector":"Tüketim El.","platform":"Midas","pct":0.005260005917202139},{"code":"MAVI","name":"Mavi Giyim","qty":138.0,"avg_cost":36.26,"pnl":1667.72,"market_value_try":6670.92,"price":48.34,"sector":"Perakende","platform":"Midas","pct":0.006561453519451525},{"code":"TUPRS","name":"Tüpraş - Türkiye Pet","qty":121.0,"avg_cost":191.65,"pnl":6430.67,"market_value_try":29620.8,"price":244.79999999999998,"sector":"Enerji","platform":"Midas","pct":0.02913473739888497},{"code":"TABGD","name":"Tab Gıda San. ve Tic","qty":28.0,"avg_cost":219.34,"pnl":1376.6,"market_value_try":7518.0,"price":268.5,"sector":"Gıda","platform":"Midas","pct":0.007394633357803207},{"code":"RYGYO","name":"Reysaş Gayrimenkul Y","qty":1045.0,"avg_cost":20.79,"pnl":7786.24,"market_value_try":29510.8,"price":28.24,"sector":"GYO","platform":"Midas","pct":0.029026542444195114},{"code":"RYSAS","name":"Reysaş Taşımacılık v","qty":300.0,"avg_cost":14.11,"pnl":1285.65,"market_value_try":5520.0,"price":18.4,"sector":"Lojistik","platform":"Midas","pct":0.005429419544436513},{"code":"ENKAI","name":"Enka İnşaat","qty":76.0,"avg_cost":68.33,"pnl":2243.29,"market_value_try":7436.6,"price":97.85000000000001,"sector":"İnşaat","platform":"Midas","pct":0.007314569091332712},{"code":"GWIND","name":"Galata Wind Enerji","qty":542.0,"avg_cost":23.81,"pnl":1433.94,"market_value_try":14341.32,"price":26.46,"sector":"Enerji","platform":"Midas","pct":0.014105986069025044}],"funds":[{"code":"KOCMT","name":"Eski","qty":0.285,"unit_price":2.75,"market_value_try":0.78,"platform":"İş Bankası"},{"code":"PATEK","name":"Eski","qty":0.82,"unit_price":19.6,"market_value_try":16.07,"platform":"İş Bankası"},{"code":"BINHO","name":"Eski","qty":0.35,"unit_price":8.9,"market_value_try":3.11,"platform":"İş Bankası"},{"code":"TGE","name":"İş Emtia Yabancı BY","qty":1744.0,"unit_price":0.2487177914452765,"market_value_try":433.7638282805622,"platform":"İş Bankası"},{"code":"TTA","name":"İş Altın Fonu","qty":3873.0,"unit_price":0.7112257756375475,"market_value_try":2754.5774290442214,"platform":"İş Bankası"},{"code":"HVS","name":"HSBC PORTFÖY HİSSE","qty":26523.0,"unit_price":1.5311879236984884,"market_value_try":40611.69730025501,"platform":"İş Bankası"},{"code":"AAV","name":"ATA PORTFÖY İKİNCİ","qty":10.0,"unit_price":62.362994,"market_value_try":623.62,"platform":"İş Bankası"},{"code":"YTD","name":"YAPI KREDİ PORTFÖY","qty":1747.0,"unit_price":0.8301441167235051,"market_value_try":1450.2617719159634,"platform":"İş Bankası"},{"code":"TCD","name":"TACİRLER PORTFÖY DE","qty":36.0,"unit_price":42.83439695523691,"market_value_try":1542.0382903885288,"platform":"İş Bankası"},{"code":"AES","name":"AK PORTFÖY PETROL Y","qty":36198.0,"unit_price":0.109303,"market_value_try":3956.54,"platform":"İş Bankası"},{"code":"MAC","name":"MARMARA CAPITAL POR","qty":42966.0,"unit_price":0.797652747368853,"market_value_try":34271.94794345014,"platform":"İş Bankası"},{"code":"AN1","name":"STRATEJİ PORTFÖY Bİ","qty":15.0,"unit_price":86.92739543875037,"market_value_try":1303.9109315812555,"platform":"İş Bankası"},{"code":"GSP","name":"AZİMUT PYŞ KAR PAYI","qty":1589.0,"unit_price":0.503996,"market_value_try":800.84,"platform":"İş Bankası"},{"code":"GBG","name":"INVEO PORTFÖY G-20","qty":1913.0,"unit_price":0.46208750893684025,"market_value_try":883.9734045961754,"platform":"İş Bankası"},{"code":"DBH","name":"DENİZ PORTFÖY EUROB","qty":37300.0,"unit_price":0.34055910220664254,"market_value_try":12702.854512307767,"platform":"İş Bankası"},{"code":"IPV","name":"İŞ PORTFÖY EUROBOND","qty":11.0,"unit_price":70.20890203349785,"market_value_try":772.2979223684763,"platform":"İş Bankası"},{"code":"OPH","name":"OSMANLI PORTFÖY BİR","qty":119.0,"unit_price":24.353021938579634,"market_value_try":2898.0096106909764,"platform":"İş Bankası"},{"code":"ZDZ","name":"ZİRAAT PORTFÖY AGRE","qty":25.0,"unit_price":12.161417396159838,"market_value_try":304.03543490399596,"platform":"İş Bankası"},{"code":"MKG","name":"AKTİF PORTFÖY ALTIN","qty":1501.0,"unit_price":19.343143494534605,"market_value_try":29034.05838529644,"platform":"İş Bankası"},{"code":"YZG","name":"YAPI KREDİ PORTFÖY","qty":3020.0,"unit_price":21.481368834226355,"market_value_try":64873.73387936359,"platform":"İş Bankası"},{"code":"ITP","name":"İŞ PORTFÖY TEKNOLOJ","qty":97.0,"unit_price":10.250791515224053,"market_value_try":994.3267769767332,"platform":"İş Bankası"},{"code":"OJT","name":"QNB PORTFÖY TEKNOLO","qty":2397.0,"unit_price":9.793913608267818,"market_value_try":23476.01091901796,"platform":"İş Bankası"},{"code":"GJB","name":"INVEO PORTFÖY BİRİN","qty":581.0,"unit_price":9.829248510678449,"market_value_try":5710.793384704179,"platform":"İş Bankası"},{"code":"IJC","name":"İŞ PORTFÖY YARI İLE","qty":151.0,"unit_price":11.380110483912725,"market_value_try":1718.3966830708216,"platform":"İş Bankası"},{"code":"ZFB","name":"AK PORTFÖY FİNTEK V","qty":173.0,"unit_price":6.107380872659522,"market_value_try":1056.5768909700973,"platform":"İş Bankası"},{"code":"YJK","name":"YAPI KREDİ PORTFÖY","qty":322.0,"unit_price":4.376262247016166,"market_value_try":1409.1564435392056,"platform":"İş Bankası"},{"code":"OLD","name":"QNB PORTFÖY TEMİZ E","qty":292.0,"unit_price":2.9491397000805675,"market_value_try":861.1487924235257,"platform":"İş Bankası"},{"code":"DHM","name":"DENİZ PORTFÖY ESG-S","qty":786.0,"unit_price":4.943100681675269,"market_value_try":3885.2771357967617,"platform":"İş Bankası"},{"code":"DMG","name":"DENİZ PORTFÖY GÜMÜŞ","qty":6424.0,"unit_price":10.55724578204134,"market_value_try":67819.74690383357,"platform":"İş Bankası"},{"code":"IEV","name":"İŞ PORTFÖY TAŞIMACI","qty":538.0,"unit_price":4.4352584491676526,"market_value_try":2386.169045652197,"platform":"İş Bankası"},{"code":"GVI","name":"GARANTİ PORTFÖY ÜÇÜ","qty":822.0,"unit_price":5.50827146503572,"market_value_try":4527.799144259362,"platform":"İş Bankası"},{"code":"DVT","name":"DENİZ PORTFÖY METAV","qty":132.0,"unit_price":7.417090926539255,"market_value_try":979.0560023031817,"platform":"İş Bankası"},{"code":"NHY","name":"NEO PORTFÖY BİRİNCİ","qty":57.0,"unit_price":5.507965,"market_value_try":313.95,"platform":"İş Bankası"},{"code":"RTG","name":"ATA PORTFÖY ROBOTİK","qty":401.0,"unit_price":4.555401178665236,"market_value_try":1826.7158726447597,"platform":"İş Bankası"},{"code":"CPU","name":"AKTİF PORTFÖY TEKNO","qty":228.0,"unit_price":2.8007325507986147,"market_value_try":638.5670215820842,"platform":"İş Bankası"},{"code":"CPT","name":"ROTA PORTFÖY ÇİP TE","qty":719.0,"unit_price":2.823634966638396,"market_value_try":2030.1935410130068,"platform":"İş Bankası"},{"code":"GPT","name":"AKTİF PORTFÖY ROBOT","qty":439.0,"unit_price":2.311171534320457,"market_value_try":1014.6043035666806,"platform":"İş Bankası"},{"code":"JET","name":"ATA PORTFÖY HAVACIL","qty":1183.0,"unit_price":2.261362865009236,"market_value_try":2675.192269305926,"platform":"İş Bankası"},{"code":"KPH","name":"İŞ PORTFÖY KAR PAYI","qty":9008.0,"unit_price":1.281124,"market_value_try":11540.36,"platform":"İş Bankası"},{"code":"GID","name":"GARANTİ PORTFÖY İNŞ","qty":927.0,"unit_price":1.6314962592146498,"market_value_try":1512.3970322919804,"platform":"İş Bankası"},{"code":"NPH","name":"NUROL PORTFÖY BİRİN","qty":839.0,"unit_price":1.704933,"market_value_try":1430.43,"platform":"İş Bankası"},{"code":"URA","name":"ATA PORTFÖY ENERJİ","qty":526.0,"unit_price":1.935552429448074,"market_value_try":1018.1005778896869,"platform":"İş Bankası"},{"code":"BDS","name":"Pardus Portföy BIST","qty":420.0,"unit_price":2.6162142857142854,"market_value_try":1098.81,"platform":"Midas"},{"code":"KHA","name":"Pardus Portföy İkinc","qty":1085.0,"unit_price":2.713364055299539,"market_value_try":2944.0,"platform":"Midas"}],"gold":[{"type":"Çeyrek Altın","qty":25,"total_gram":43.75,"cost_try":194001.2,"current_value_try":302419.51,"profit_try":108418.31,"profit_pct":0.5588538112135388},{"type":"Bilezik","qty":2,"total_gram":14.770000000000003,"cost_try":65494.8,"current_value_try":102096.82,"profit_try":36602.02,"profit_pct":0.5588538326706852}],"gold_total":{"type":"TOPLAM ALTIN","qty":27,"total_gram":58.52,"cost_try":259496,"current_value_try":404516.33,"profit_try":145020.33000000002,"profit_pct":0.5588538166291581},"crypto_etf":[{"asset":"Bitcoin","type":"Kripto Para","qty":0.00136,"avg_cost":3426584.6,"current_price":3443426.47,"currency":"TRY","total_value_try":4683.06,"profit_pct":0.004915060491497922},{"asset":"VOO","type":"ETF (S&P 500)","qty":0.83180224,"avg_cost":632.45,"current_price":636.2209,"currency":"USD","total_value_try":22838.05755,"profit_pct":0.005968749679381197}],"usd_try_rate":"43,155"},"ŞUBAT":{"report_date":"28.02.2026","sheet_name":"ŞUBAT","display_name":"Şubat","summary":[{"category":"📈 Hisse Senetleri","value_try":248757.71,"pct":0.23466958721503836,"platform":"Midas","comment":"18 pozisyon, BIST","clean_name":"Hisse Senetleri","key":"hisse"},{"category":"📊 Yatırım Fonları","value_try":325661.7857378515,"pct":0.3072182841320331,"platform":"İş B./Midas","comment":"45 fon","clean_name":"Yatırım Fonları","key":"fon"},{"category":"🥇 Fiziki Altın","value_try":443219.79,"pct":0.41811851847661724,"platform":"Midas","comment":"Çeyrek (25) + Bilezik (2)","clean_name":"Fiziki Altın","key":"altin"},{"category":"🔗 Bitcoin","value_try":19502.38,"pct":0.01839788388593391,"platform":"Midas","comment":"0.0066223 BTC","clean_name":"Bitcoin","key":"bitcoin"},{"category":"🌐 VOO (S&P 500 ETF)","value_try":22892.20125,"pct":0.021595726290377433,"platform":"Midas","comment":"$631.04","clean_name":"VOO (S&P 500 ETF)","key":"voo"}],"total_try":1060033.8669878514,"stocks":[{"code":"MGROS","name":"Migros Ticaret","qty":8.0,"avg_cost":507.01,"pnl":1107.91,"market_value_try":5164.0,"price":645.5,"sector":"Perakende","platform":"Midas","pct":0.0048715424674815435},{"code":"EREGL","name":"Ereğli Demir ve Çeli","qty":522.0,"avg_cost":24.57,"pnl":4225.36,"market_value_try":17048.52,"price":32.660000000000004,"sector":"Metal","platform":"Midas","pct":0.016082995582437733},{"code":"ENJSA","name":"Enerjisa Enerji","qty":151.0,"avg_cost":80.99,"pnl":3988.05,"market_value_try":16217.4,"price":107.39999999999999,"sector":"Enerji","platform":"Midas","pct":0.015298945161141591},{"code":"LOGO","name":"Logo Yazılım","qty":12.0,"avg_cost":149.47,"pnl":-132.8,"market_value_try":1660.8,"price":138.4,"sector":"Teknoloji","platform":"Midas","pct":0.001566742395428611},{"code":"FROTO","name":"Ford Otomotiv","qty":30.0,"avg_cost":90.09,"pnl":774.22,"market_value_try":3477.0,"price":115.9,"sector":"Otomotiv","platform":"Midas","pct":0.0032800838806028906},{"code":"TTRAK","name":"Türk Traktör ve Zira","qty":24.0,"avg_cost":529.17,"pnl":-436.0,"market_value_try":12264.0,"price":511.0,"sector":"Tarım Mak.","platform":"Midas","pct":0.011569441677225727},{"code":"AKSA","name":"Aksa Akrilik Kimya","qty":238.0,"avg_cost":10.49,"pnl":-74.51,"market_value_try":2422.84,"price":10.180000000000001,"sector":"Kimya","platform":"Midas","pct":0.0022856250875121966},{"code":"VESBE","name":"Vestel Beyaz Eşya","qty":649.0,"avg_cost":8.97,"pnl":-595.21,"market_value_try":5224.45,"price":8.049999999999999,"sector":"Tüketim El.","platform":"Midas","pct":0.0049285689473729565},{"code":"MAVI","name":"Mavi Giyim","qty":138.0,"avg_cost":36.26,"pnl":1262.0,"market_value_try":6265.2,"price":45.4,"sector":"Perakende","platform":"Midas","pct":0.005910377201252007},{"code":"TUPRS","name":"Tüpraş - Türkiye Pet","qty":121.0,"avg_cost":191.65,"pnl":3248.37,"market_value_try":26438.5,"price":218.5,"sector":"Enerji","platform":"Midas","pct":0.024941184261524165},{"code":"TABGD","name":"Tab Gıda San. ve Tic","qty":28.0,"avg_cost":219.34,"pnl":1145.6,"market_value_try":7287.0,"price":260.25,"sector":"Gıda","platform":"Midas","pct":0.006874308667803642},{"code":"RYGYO","name":"Reysaş Gayrimenkul Y","qty":1045.0,"avg_cost":20.79,"pnl":12091.64,"market_value_try":33816.2,"price":32.36,"sector":"GYO","platform":"Midas","pct":0.03190105623331707},{"code":"RYSAS","name":"Reysaş Taşımacılık v","qty":300.0,"avg_cost":14.11,"pnl":1762.65,"market_value_try":5997.0,"price":19.99,"sector":"Lojistik","platform":"Midas","pct":0.005657366417019136},{"code":"ENKAI","name":"Enka İnşaat","qty":76.0,"avg_cost":68.33,"pnl":2535.89,"market_value_try":7729.2,"price":101.7,"sector":"İnşaat","platform":"Midas","pct":0.00729146515097954},{"code":"SISE","name":"Türkiye Şişe ve Cam","qty":852.0,"avg_cost":41.22,"pnl":3099.78,"market_value_try":38220.72,"price":44.86,"sector":"Cam/Sanayi","platform":"Midas","pct":0.03605613102589488},{"code":"ISMEN","name":"İş Yatırım Menkul De","qty":737.0,"avg_cost":40.85,"pnl":5385.9,"market_value_try":35493.92,"price":48.16,"sector":"Finans","platform":"Midas","pct":0.03348376038291876},{"code":"GWIND","name":"Galata Wind Enerji","qty":592.0,"avg_cost":23.97,"pnl":1128.78,"market_value_try":15320.96,"price":25.88,"sector":"Enerji","platform":"Midas","pct":0.014453274067115806},{"code":"CLEBI","name":"Çelebi Hava Servisi","qty":5.0,"avg_cost":1581.8,"pnl":801.0,"market_value_try":8710.0,"price":1742.0,"sector":"Havacılık","platform":"Midas","pct":0.008216718608010118}],"funds":[{"code":"KOCMT","name":"Eski","qty":0.285,"unit_price":2.58,"market_value_try":0.73,"platform":"İş Bankası"},{"code":"PATEK","name":"Eski","qty":0.82,"unit_price":19.29,"market_value_try":15.81,"platform":"İş Bankası"},{"code":"EMPAE","name":"Eski","qty":20.0,"unit_price":26.62,"market_value_try":532.4,"platform":"İş Bankası"},{"code":"BINHO","name":"Eski","qty":0.35,"unit_price":9.0,"market_value_try":3.15,"platform":"İş Bankası"},{"code":"TGE","name":"İş Emtia Yabancı BY","qty":1744.0,"unit_price":0.2455195293650817,"market_value_try":428.1860592127025,"platform":"İş Bankası"},{"code":"TTA","name":"İş Altın Fonu","qty":3873.0,"unit_price":0.7126816548002776,"market_value_try":2760.216049041475,"platform":"İş Bankası"},{"code":"HVS","name":"HSBC PORTFÖY HİSSE","qty":26523.0,"unit_price":1.5501991529591288,"market_value_try":41115.93213393497,"platform":"İş Bankası"},{"code":"AAV","name":"ATA PORTFÖY İKİNCİ","qty":10.0,"unit_price":62.797823,"market_value_try":627.97,"platform":"İş Bankası"},{"code":"YTD","name":"YAPI KREDİ PORTFÖY","qty":1747.0,"unit_price":0.8117041254587258,"market_value_try":1418.047107176394,"platform":"İş Bankası"},{"code":"TCD","name":"TACİRLER PORTFÖY DE","qty":36.0,"unit_price":42.941482947625005,"market_value_try":1545.8933861145001,"platform":"İş Bankası"},{"code":"AES","name":"AK PORTFÖY PETROL Y","qty":36198.0,"unit_price":0.109062,"market_value_try":3947.82,"platform":"İş Bankası"},{"code":"MAC","name":"MARMARA CAPITAL POR","qty":42966.0,"unit_price":0.7794192032167485,"market_value_try":33488.52548541081,"platform":"İş Bankası"},{"code":"AN1","name":"STRATEJİ PORTFÖY Bİ","qty":15.0,"unit_price":87.42844494605933,"market_value_try":1311.42667419089,"platform":"İş Bankası"},{"code":"GSP","name":"AZİMUT PYŞ KAR PAYI","qty":1589.0,"unit_price":0.514781,"market_value_try":817.98,"platform":"İş Bankası"},{"code":"GBG","name":"INVEO PORTFÖY G-20","qty":1913.0,"unit_price":0.4772070122292537,"market_value_try":912.8970143945623,"platform":"İş Bankası"},{"code":"DBH","name":"DENİZ PORTFÖY EUROB","qty":37300.0,"unit_price":0.34876827936533367,"market_value_try":13009.056820326945,"platform":"İş Bankası"},{"code":"IPV","name":"İŞ PORTFÖY EUROBOND","qty":11.0,"unit_price":71.45553129800464,"market_value_try":786.0108442780511,"platform":"İş Bankası"},{"code":"OPH","name":"OSMANLI PORTFÖY BİR","qty":119.0,"unit_price":24.216498897591958,"market_value_try":2881.763368813443,"platform":"İş Bankası"},{"code":"ZDZ","name":"ZİRAAT PORTFÖY AGRE","qty":25.0,"unit_price":11.85779544944731,"market_value_try":296.44488623618275,"platform":"İş Bankası"},{"code":"MKG","name":"AKTİF PORTFÖY ALTIN","qty":1501.0,"unit_price":19.27000706898177,"market_value_try":28924.280610541635,"platform":"İş Bankası"},{"code":"YZG","name":"YAPI KREDİ PORTFÖY","qty":3020.0,"unit_price":18.6704457967925,"market_value_try":56384.74630631335,"platform":"İş Bankası"},{"code":"ITP","name":"İŞ PORTFÖY TEKNOLOJ","qty":97.0,"unit_price":10.302147980715326,"market_value_try":999.3083541293865,"platform":"İş Bankası"},{"code":"OJT","name":"QNB PORTFÖY TEKNOLO","qty":2397.0,"unit_price":9.699147700194219,"market_value_try":23248.857037365542,"platform":"İş Bankası"},{"code":"GJB","name":"INVEO PORTFÖY BİRİN","qty":581.0,"unit_price":9.885855152851446,"market_value_try":5743.68184380669,"platform":"İş Bankası"},{"code":"IJC","name":"İŞ PORTFÖY YARI İLE","qty":151.0,"unit_price":11.767580485668987,"market_value_try":1776.904653336017,"platform":"İş Bankası"},{"code":"ZFB","name":"AK PORTFÖY FİNTEK V","qty":173.0,"unit_price":5.948320245211978,"market_value_try":1029.059402421672,"platform":"İş Bankası"},{"code":"YJK","name":"YAPI KREDİ PORTFÖY","qty":322.0,"unit_price":4.4665401609098625,"market_value_try":1438.2259318129757,"platform":"İş Bankası"},{"code":"OLD","name":"QNB PORTFÖY TEMİZ E","qty":292.0,"unit_price":2.978660588478374,"market_value_try":869.7688918356853,"platform":"İş Bankası"},{"code":"DHM","name":"DENİZ PORTFÖY ESG-S","qty":786.0,"unit_price":4.998616645431165,"market_value_try":3928.9126833088953,"platform":"İş Bankası"},{"code":"DMG","name":"DENİZ PORTFÖY GÜMÜŞ","qty":6424.0,"unit_price":9.182312320371404,"market_value_try":58987.1743460659,"platform":"İş Bankası"},{"code":"IEV","name":"İŞ PORTFÖY TAŞIMACI","qty":538.0,"unit_price":4.64756540061241,"market_value_try":2500.3901855294766,"platform":"İş Bankası"},{"code":"GVI","name":"GARANTİ PORTFÖY ÜÇÜ","qty":822.0,"unit_price":5.578000673511607,"market_value_try":4585.116553626541,"platform":"İş Bankası"},{"code":"DVT","name":"DENİZ PORTFÖY METAV","qty":132.0,"unit_price":7.3887131366543155,"market_value_try":975.3101340383696,"platform":"İş Bankası"},{"code":"NHY","name":"NEO PORTFÖY BİRİNCİ","qty":57.0,"unit_price":5.458925,"market_value_try":311.15,"platform":"İş Bankası"},{"code":"RTG","name":"ATA PORTFÖY ROBOTİK","qty":401.0,"unit_price":4.41027065251414,"market_value_try":1768.51853165817,"platform":"İş Bankası"},{"code":"CPU","name":"AKTİF PORTFÖY TEKNO","qty":228.0,"unit_price":2.87285421471423,"market_value_try":655.0107609548445,"platform":"İş Bankası"},{"code":"CPT","name":"ROTA PORTFÖY ÇİP TE","qty":719.0,"unit_price":2.9340221520241574,"market_value_try":2109.561927305369,"platform":"İş Bankası"},{"code":"GPT","name":"AKTİF PORTFÖY ROBOT","qty":439.0,"unit_price":2.3285538554300813,"market_value_try":1022.2351425338057,"platform":"İş Bankası"},{"code":"JET","name":"ATA PORTFÖY HAVACIL","qty":1183.0,"unit_price":2.3051428500758147,"market_value_try":2726.9839916396886,"platform":"İş Bankası"},{"code":"KPH","name":"İŞ PORTFÖY KAR PAYI","qty":9008.0,"unit_price":1.308035,"market_value_try":11782.77,"platform":"İş Bankası"},{"code":"GID","name":"GARANTİ PORTFÖY İNŞ","qty":927.0,"unit_price":1.6258121262475458,"market_value_try":1507.1278410314749,"platform":"İş Bankası"},{"code":"NPH","name":"NUROL PORTFÖY BİRİN","qty":839.0,"unit_price":1.618598,"market_value_try":1358.0,"platform":"İş Bankası"},{"code":"URA","name":"ATA PORTFÖY ENERJİ","qty":526.0,"unit_price":1.8467125084888367,"market_value_try":971.3707794651281,"platform":"İş Bankası"},{"code":"BDS","name":"Pardus Portföy BIST","qty":420.0,"unit_price":2.3876904761904765,"market_value_try":1002.83,"platform":"Midas"},{"code":"KHA","name":"Pardus Portföy İkinc","qty":1085.0,"unit_price":2.9071244239631335,"market_value_try":3154.23,"platform":"Midas"}],"gold":[{"type":"Çeyrek Altın","qty":25,"total_gram":43.75,"cost_try":194001.2,"current_value_try":331354.51,"profit_try":137353.31,"profit_pct":0.7080023731811967},{"type":"Bilezik","qty":2,"total_gram":14.770000000000003,"cost_try":65494.8,"current_value_try":111865.28,"profit_try":46370.48,"profit_pct":0.7080024673714554}],"gold_total":{"type":"TOPLAM ALTIN","qty":27,"total_gram":58.52,"cost_try":259496,"current_value_try":443219.79,"profit_try":183723.78999999998,"profit_pct":0.7080023969540955},"crypto_etf":[{"asset":"Bitcoin","type":"Kripto Para","qty":0.0066223,"avg_cost":2990297.82,"current_price":2944955.68,"currency":"TRY","total_value_try":19502.38,"profit_pct":-0.015163084976352688},{"asset":"VOO","type":"ETF (S&P 500)","qty":0.83180224,"avg_cost":632.45,"current_price":631.0394,"currency":"USD","total_value_try":22892.20125,"profit_pct":-0.0022240245620624203}],"usd_try_rate":"43,6125"},"MART":{"report_date":"31.03.2026","sheet_name":"MART","display_name":"Mart","summary":[{"category":"📈 Hisse Senetleri","value_try":280393.89,"pct":0.27401018556043133,"platform":"Midas","comment":"20 pozisyon, BIST","clean_name":"Hisse Senetleri","key":"hisse"},{"category":"📊 Yatırım Fonları","value_try":282461.18359034136,"pct":0.27603041324904937,"platform":"İş B./Midas","comment":"43 fon","clean_name":"Yatırım Fonları","key":"fon"},{"category":"🥇 Fiziki Altın","value_try":407569,"pct":0.39828991037814493,"platform":"Midas","comment":"Çeyrek (25) + Bilezik (2)","clean_name":"Fiziki Altın","key":"altin"},{"category":"🔗 Bitcoin","value_try":30887.01,"pct":0.030183808004899455,"platform":"Midas","comment":"0.0101907 BTC","clean_name":"Bitcoin","key":"bitcoin"},{"category":"🌐 VOO (S&P 500 ETF)","value_try":21986.24175,"pct":0.021485682807474878,"platform":"Midas","comment":"$597.55","clean_name":"VOO (S&P 500 ETF)","key":"voo"}],"total_try":1023297.3253403414,"stocks":[{"code":"EREGL","name":"Ereğli Demir ve Çeli","qty":522.0,"avg_cost":24.57,"pnl":1907.68,"market_value_try":14730.84,"price":28.22,"sector":"Metal","platform":"Midas","pct":0.014395464187400888},{"code":"LOGO","name":"Logo Yazılım","qty":12.0,"avg_cost":149.47,"pnl":-212.0,"market_value_try":1581.6,"price":131.79999999999998,"sector":"Teknoloji","platform":"Midas","pct":0.001545591843967706},{"code":"TTRAK","name":"Türk Traktör ve Zira","qty":24.0,"avg_cost":529.17,"pnl":-2032.0,"market_value_try":10668.0,"price":444.5,"sector":"Tarım Mak.","platform":"Midas","pct":0.010425122528735134},{"code":"VESBE","name":"Vestel Beyaz Eşya","qty":649.0,"avg_cost":8.97,"pnl":-1302.62,"market_value_try":4517.04,"price":6.96,"sector":"Tüketim El.","platform":"Midas","pct":0.004414200924934173},{"code":"MGROS","name":"Migros Ticaret","qty":12.0,"avg_cost":528.51,"pnl":887.91,"market_value_try":7230.0,"price":602.5,"sector":"Perakende","platform":"Midas","pct":0.007065395189609582},{"code":"GWIND","name":"Galata Wind Enerji","qty":640.0,"avg_cost":23.98,"pnl":3338.06,"market_value_try":18688.0,"price":29.2,"sector":"Enerji","platform":"Midas","pct":0.018262531853862222},{"code":"CLEBI","name":"Çelebi Hava Servisi","qty":6.0,"avg_cost":1596.5,"pnl":759.0,"market_value_try":10338.0,"price":1723.0,"sector":"Havacılık","platform":"Midas","pct":0.010102635611367062},{"code":"FROTO","name":"Ford Otomotiv","qty":30.0,"avg_cost":87.1,"pnl":419.91,"market_value_try":3033.0,"price":101.1,"sector":"Otomotiv","platform":"Midas","pct":0.0029639479405374636},{"code":"MPARK","name":"MLP Sağlık Hizmetler","qty":3.0,"avg_cost":433.0,"pnl":-22.5,"market_value_try":1276.5,"price":425.5,"sector":"Sağlık","platform":"Midas","pct":0.0012474380303646793},{"code":"SISE","name":"Türkiye Şişe ve Cam","qty":854.0,"avg_cost":41.23,"pnl":2350.3,"market_value_try":37558.92,"price":43.98,"sector":"Cam/Sanayi","platform":"Midas","pct":0.03670381918325465},{"code":"MAVI","name":"Mavi Giyim","qty":208.0,"avg_cost":37.93,"pnl":867.0,"market_value_try":8756.8,"price":42.099999999999994,"sector":"Perakende","platform":"Midas","pct":0.008557434660632529},{"code":"AKSA","name":"Aksa Akrilik Kimya","qty":357.0,"avg_cost":10.29,"pnl":193.22,"market_value_try":3866.31,"price":10.83,"sector":"Kimya","platform":"Midas","pct":0.003778286040876822},{"code":"TABGD","name":"Tab Gıda San. ve Tic","qty":37.0,"avg_cost":226.02,"pnl":561.7,"market_value_try":8924.4,"price":241.2,"sector":"Gıda","platform":"Midas","pct":0.008721218925332192},{"code":"ENJSA","name":"Enerjisa Enerji","qty":163.0,"avg_cost":83.58,"pnl":5039.75,"market_value_try":18663.5,"price":114.5,"sector":"Enerji","platform":"Midas","pct":0.01823858964333035},{"code":"AGESA","name":"Agesa Hayat Emeklili","qty":1.0,"avg_cost":215.4,"pnl":12.8,"market_value_try":228.2,"price":228.2,"sector":"Sigorta","platform":"Midas","pct":0.00022300458952543659},{"code":"ENKAI","name":"Enka İnşaat","qty":229.0,"avg_cost":84.44,"pnl":2062.44,"market_value_try":21400.05,"price":93.45,"sector":"İnşaat","platform":"Midas","pct":0.020912836836432164},{"code":"ISMEN","name":"İş Yatırım Menkul De","qty":842.0,"avg_cost":41.26,"pnl":1596.9,"market_value_try":36340.72,"price":43.160000000000004,"sector":"Finans","platform":"Midas","pct":0.035513353841624996},{"code":"TUPRS","name":"Tüpraş - Türkiye Pet","qty":129.0,"avg_cost":187.54,"pnl":9121.67,"market_value_try":33314.25,"price":258.25,"sector":"Enerji","platform":"Midas","pct":0.03255578723311909},{"code":"RYSAS","name":"Reysaş Taşımacılık v","qty":350.0,"avg_cost":14.82,"pnl":1226.15,"market_value_try":6412.0,"price":18.32,"sector":"Lojistik","platform":"Midas","pct":0.006266018527769936},{"code":"RYGYO","name":"Reysaş Gayrimenkul Y","qty":1124.0,"avg_cost":21.47,"pnl":8738.42,"market_value_try":32865.76,"price":29.240000000000002,"sector":"GYO","platform":"Midas","pct":0.03211750796775422}],"funds":[{"code":"KOCMT","name":"Eski","qty":0.285,"unit_price":2.43,"market_value_try":0.69,"platform":"İş Bankası"},{"code":"PATEK","name":"Eski","qty":0.82,"unit_price":17.92,"market_value_try":14.69,"platform":"İş Bankası"},{"code":"BINHO","name":"Eski","qty":0.35,"unit_price":9.18,"market_value_try":3.21,"platform":"İş Bankası"},{"code":"TGE","name":"İş Emtia Yabancı BY","qty":1744.0,"unit_price":0.2720103500249859,"market_value_try":474.3860504435754,"platform":"İş Bankası"},{"code":"TTA","name":"İş Altın Fonu","qty":3873.0,"unit_price":0.6196489042643042,"market_value_try":2399.90020621565,"platform":"İş Bankası"},{"code":"HVS","name":"HSBC PORTFÖY HİSSE","qty":26523.0,"unit_price":1.4176524747836645,"market_value_try":37600.39658868714,"platform":"İş Bankası"},{"code":"AAV","name":"ATA PORTFÖY İKİNCİ","qty":10.0,"unit_price":56.854271,"market_value_try":568.54,"platform":"İş Bankası"},{"code":"YTD","name":"YAPI KREDİ PORTFÖY","qty":1747.0,"unit_price":0.7284411396774206,"market_value_try":1272.586671016454,"platform":"İş Bankası"},{"code":"TCD","name":"TACİRLER PORTFÖY DE","qty":36.0,"unit_price":40.97149947591976,"market_value_try":1474.9739811331112,"platform":"İş Bankası"},{"code":"MAC","name":"MARMARA CAPITAL POR","qty":42966.0,"unit_price":0.7265176836368181,"market_value_try":31215.55879513953,"platform":"İş Bankası"},{"code":"AN1","name":"STRATEJİ PORTFÖY Bİ","qty":15.0,"unit_price":86.33987337803595,"market_value_try":1295.0981006705392,"platform":"İş Bankası"},{"code":"GSP","name":"AZİMUT PYŞ KAR PAYI","qty":1589.0,"unit_price":0.490749,"market_value_try":779.8,"platform":"İş Bankası"},{"code":"GBG","name":"INVEO PORTFÖY G-20","qty":1913.0,"unit_price":0.4567815976918172,"market_value_try":873.8231963844463,"platform":"İş Bankası"},{"code":"DBH","name":"DENİZ PORTFÖY EUROB","qty":37300.0,"unit_price":0.33899230449472334,"market_value_try":12644.412957653181,"platform":"İş Bankası"},{"code":"IPV","name":"İŞ PORTFÖY EUROBOND","qty":11.0,"unit_price":70.72475557941995,"market_value_try":777.9723113736194,"platform":"İş Bankası"},{"code":"OPH","name":"OSMANLI PORTFÖY BİR","qty":119.0,"unit_price":22.331510839902297,"market_value_try":2657.449789948373,"platform":"İş Bankası"},{"code":"ZDZ","name":"ZİRAAT PORTFÖY AGRE","qty":25.0,"unit_price":10.727012359797117,"market_value_try":268.17530899492795,"platform":"İş Bankası"},{"code":"MKG","name":"AKTİF PORTFÖY ALTIN","qty":1501.0,"unit_price":17.224919758764873,"market_value_try":25854.604557906074,"platform":"İş Bankası"},{"code":"YZG","name":"YAPI KREDİ PORTFÖY","qty":3020.0,"unit_price":14.337819486080427,"market_value_try":43300.21484796289,"platform":"İş Bankası"},{"code":"ITP","name":"İŞ PORTFÖY TEKNOLOJ","qty":97.0,"unit_price":9.988148812411103,"market_value_try":968.850434803877,"platform":"İş Bankası"},{"code":"OJT","name":"QNB PORTFÖY TEKNOLO","qty":2397.0,"unit_price":9.311821935934663,"market_value_try":22320.437180435387,"platform":"İş Bankası"},{"code":"GJB","name":"INVEO PORTFÖY BİRİN","qty":581.0,"unit_price":9.290509183836427,"market_value_try":5397.785835808964,"platform":"İş Bankası"},{"code":"IJC","name":"İŞ PORTFÖY YARI İLE","qty":151.0,"unit_price":11.427426804150238,"market_value_try":1725.541447426686,"platform":"İş Bankası"},{"code":"ZFB","name":"AK PORTFÖY FİNTEK V","qty":173.0,"unit_price":5.702482117797612,"market_value_try":986.5294063789869,"platform":"İş Bankası"},{"code":"YJK","name":"YAPI KREDİ PORTFÖY","qty":322.0,"unit_price":4.196962129498147,"market_value_try":1351.4218056984034,"platform":"İş Bankası"},{"code":"OLD","name":"QNB PORTFÖY TEMİZ E","qty":292.0,"unit_price":2.821232419056115,"market_value_try":823.7998663643856,"platform":"İş Bankası"},{"code":"DHM","name":"DENİZ PORTFÖY ESG-S","qty":786.0,"unit_price":4.7033733532687725,"market_value_try":3696.8514556692553,"platform":"İş Bankası"},{"code":"DMG","name":"DENİZ PORTFÖY GÜMÜŞ","qty":6424.0,"unit_price":7.3495227812252715,"market_value_try":47213.334346591146,"platform":"İş Bankası"},{"code":"IEV","name":"İŞ PORTFÖY TAŞIMACI","qty":538.0,"unit_price":4.350186280888824,"market_value_try":2340.4002191181876,"platform":"İş Bankası"},{"code":"GVI","name":"GARANTİ PORTFÖY ÜÇÜ","qty":822.0,"unit_price":5.134700225985619,"market_value_try":4220.723585760179,"platform":"İş Bankası"},{"code":"DVT","name":"DENİZ PORTFÖY METAV","qty":132.0,"unit_price":7.0562506003574175,"market_value_try":931.4250792471792,"platform":"İş Bankası"},{"code":"NHY","name":"NEO PORTFÖY BİRİNCİ","qty":57.0,"unit_price":4.984453,"market_value_try":284.11,"platform":"İş Bankası"},{"code":"RTG","name":"ATA PORTFÖY ROBOTİK","qty":401.0,"unit_price":4.1124053829139875,"market_value_try":1649.074558548509,"platform":"İş Bankası"},{"code":"CPU","name":"AKTİF PORTFÖY TEKNO","qty":228.0,"unit_price":2.7096531124847445,"market_value_try":617.8009096465217,"platform":"İş Bankası"},{"code":"CPT","name":"ROTA PORTFÖY ÇİP TE","qty":719.0,"unit_price":2.693238690096143,"market_value_try":1936.4386181791267,"platform":"İş Bankası"},{"code":"GPT","name":"AKTİF PORTFÖY ROBOT","qty":439.0,"unit_price":2.1848774254423344,"market_value_try":959.1611897691848,"platform":"İş Bankası"},{"code":"JET","name":"ATA PORTFÖY HAVACIL","qty":1183.0,"unit_price":2.12713971919296,"market_value_try":2516.406287805272,"platform":"İş Bankası"},{"code":"KPH","name":"İŞ PORTFÖY KAR PAYI","qty":9008.0,"unit_price":1.251985,"market_value_try":11277.88,"platform":"İş Bankası"},{"code":"GID","name":"GARANTİ PORTFÖY İNŞ","qty":927.0,"unit_price":1.5517124869695613,"market_value_try":1438.4374754207834,"platform":"İş Bankası"},{"code":"NPH","name":"NUROL PORTFÖY BİRİN","qty":839.0,"unit_price":1.585743,"market_value_try":1330.43,"platform":"İş Bankası"},{"code":"URA","name":"ATA PORTFÖY ENERJİ","qty":526.0,"unit_price":1.7288793234596895,"market_value_try":909.3905241397966,"platform":"İş Bankası"},{"code":"BDS","name":"Pardus Portföy BIST","qty":420.0,"unit_price":2.2715714285714284,"market_value_try":954.06,"platform":"Midas"},{"code":"KHA","name":"Pardus Portföy İkinc","qty":1085.0,"unit_price":2.888857142857143,"market_value_try":3134.41,"platform":"Midas"}],"gold":[{"type":"Çeyrek Altın","qty":25,"total_gram":40.2,"cost_try":149824,"current_value_try":282300,"profit_try":132476,"profit_pct":0.884210807347288},{"type":"Bilezik","qty":2,"total_gram":18.32,"cost_try":109672,"current_value_try":125269,"profit_try":15597,"profit_pct":0.14221496826902}],"gold_total":{"type":"TOPLAM ALTIN","qty":27,"total_gram":58.52,"cost_try":259496,"current_value_try":407569,"profit_try":148073,"profit_pct":0.570617658846379},"crypto_etf":[{"asset":"Bitcoin","type":"Kripto Para","qty":0.0101907,"avg_cost":2986867.58,"current_price":3030901.7,"currency":"TRY","total_value_try":30887.01,"profit_pct":0.014742576734946765},{"asset":"VOO","type":"ETF (S&P 500)","qty":0.83390021,"avg_cost":632.35,"current_price":597.5535,"currency":"USD","total_value_try":21986.24175,"profit_pct":-0.055033331237371995}],"usd_try_rate":"44,1225"},"NİSAN":{"report_date":"30.04.2026","sheet_name":"NİSAN","display_name":"Nisan","summary":[{"category":"📈 Hisse Senetleri","value_try":330316.92,"pct":0.30493113872707817,"platform":"Midas","comment":"20 pozisyon, BIST","clean_name":"Hisse Senetleri","key":"hisse"},{"category":"📊 Yatırım Fonları","value_try":300858.02078362164,"pct":0.277736238497031,"platform":"İş B./Midas","comment":"43 fon","clean_name":"Yatırım Fonları","key":"fon"},{"category":"🥇 Fiziki Altın","value_try":392001,"pct":0.36187462426131056,"platform":"Midas","comment":"Çeyrek (25) + Bilezik (2)","clean_name":"Fiziki Altın","key":"altin"},{"category":"🔗 Bitcoin","value_try":35443.22,"pct":0.03271930918571883,"platform":"Midas","comment":"0.0102686 BTC","clean_name":"Bitcoin","key":"bitcoin"},{"category":"🌐 VOO (S&P 500 ETF)","value_try":24631.704900000004,"pct":0.022738689328861365,"platform":"Midas","comment":"$660.58","clean_name":"VOO (S&P 500 ETF)","key":"voo"}],"total_try":1083250.8656836217,"stocks":[{"code":"EREGL","name":"Ereğli Demir ve Çeli","qty":522.0,"avg_cost":24.57,"pnl":5509.48,"market_value_try":18332.64,"price":35.12,"sector":"Metal","platform":"Midas","pct":0.01692372522447104},{"code":"TTRAK","name":"Türk Traktör ve Zira","qty":24.0,"avg_cost":529.17,"pnl":-2044.0,"market_value_try":10656.0,"price":444.0,"sector":"Tarım Mak.","platform":"Midas","pct":0.00983705652824489},{"code":"VESBE","name":"Vestel Beyaz Eşya","qty":649.0,"avg_cost":8.97,"pnl":-1198.78,"market_value_try":4620.88,"price":7.12,"sector":"Tüketim El.","platform":"Midas","pct":0.004265752418378026},{"code":"FROTO","name":"Ford Otomotiv","qty":30.0,"avg_cost":87.1,"pnl":326.91,"market_value_try":2940.0,"price":98.0,"sector":"Otomotiv","platform":"Midas","pct":0.0027140527583558536},{"code":"SISE","name":"Türkiye Şişe ve Cam","qty":854.0,"avg_cost":41.23,"pnl":5663.82,"market_value_try":40872.44,"price":47.86,"sector":"Cam/Sanayi","platform":"Midas","pct":0.037731278409093245},{"code":"TABGD","name":"Tab Gıda San. ve Tic","qty":37.0,"avg_cost":226.02,"pnl":1590.3,"market_value_try":9953.0,"price":269.0,"sector":"Gıda","platform":"Midas","pct":0.009188084048950957},{"code":"AGESA","name":"Agesa Hayat Emeklili","qty":1.0,"avg_cost":215.4,"pnl":25.5,"market_value_try":240.9,"price":240.9,"sector":"Sigorta","platform":"Midas","pct":0.00022238615968977048},{"code":"GWIND","name":"Galata Wind Enerji","qty":740.0,"avg_cost":24.59,"pnl":4155.06,"market_value_try":22348.0,"price":30.2,"sector":"Enerji","platform":"Midas","pct":0.02063049355229137},{"code":"ENJSA","name":"Enerjisa Enerji","qty":163.0,"avg_cost":80.17,"pnl":6948.04,"market_value_try":20016.4,"price":122.80000000000001,"sector":"Enerji","platform":"Midas","pct":0.018478083548419767},{"code":"RYGYO","name":"Reysaş Gayrimenkul Y","qty":1187.0,"avg_cost":22.05,"pnl":9790.84,"market_value_try":35966.1,"price":30.299999999999997,"sector":"GYO","platform":"Midas","pct":0.03320200439193961},{"code":"TUPRS","name":"Tüpraş - Türkiye Pet","qty":140.0,"avg_cost":192.69,"pnl":10963.32,"market_value_try":37940.0,"price":271.0,"sector":"Enerji","platform":"Midas","pct":0.03502420464354459},{"code":"MAVI","name":"Mavi Giyim","qty":263.0,"avg_cost":39.1,"pnl":1108.86,"market_value_try":11393.16,"price":43.32,"sector":"Perakende","platform":"Midas","pct":0.010517563715778768},{"code":"ISMEN","name":"İş Yatırım Menkul De","qty":948.0,"avg_cost":38.62,"pnl":3470.67,"market_value_try":40081.44,"price":42.28,"sector":"Finans","platform":"Midas","pct":0.03700106897648798},{"code":"LOGO","name":"Logo Yazılım","qty":39.0,"avg_cost":140.31,"pnl":128.3,"market_value_try":5600.4,"price":143.6,"sector":"Teknoloji","platform":"Midas","pct":0.005169993560508885},{"code":"CLEBI","name":"Çelebi Hava Servisi","qty":7.0,"avg_cost":1549.06,"pnl":1658.56,"market_value_try":12502.0,"price":1786.0,"sector":"Havacılık","platform":"Midas","pct":0.011541186253389416},{"code":"AKSA","name":"Aksa Akrilik Kimya","qty":524.0,"avg_cost":9.98,"pnl":320.93,"market_value_try":5549.16,"price":10.59,"sector":"Kimya","platform":"Midas","pct":0.005122691498148969},{"code":"ENKAI","name":"Enka İnşaat","qty":254.0,"avg_cost":84.31,"pnl":5152.8,"market_value_try":26568.4,"price":104.60000000000001,"sector":"İnşaat","platform":"Midas","pct":0.024526543981327097},{"code":"MGROS","name":"Migros Ticaret","qty":19.0,"avg_cost":569.66,"pnl":1364.91,"market_value_try":12188.5,"price":641.5,"sector":"Perakende","platform":"Midas","pct":0.011251779607217797},{"code":"MPARK","name":"MLP Sağlık Hizmetler","qty":10.0,"avg_cost":449.38,"pnl":-46.25,"market_value_try":4447.5,"price":444.75,"sector":"Sağlık","platform":"Midas","pct":0.004105697157410769},{"code":"RYSAS","name":"Reysaş Taşımacılık v","qty":405.0,"avg_cost":15.57,"pnl":1795.23,"market_value_try":8100.0,"price":20.0,"sector":"Lojistik","platform":"Midas","pct":0.007477492293429393}],"funds":[{"code":"KOCMT","name":"Eski","qty":0.285,"unit_price":2.58,"market_value_try":0.73,"platform":"İş Bankası"},{"code":"PATEK","name":"Eski","qty":0.82,"unit_price":21.68,"market_value_try":17.77,"platform":"İş Bankası"},{"code":"BINHO","name":"Eski","qty":0.35,"unit_price":10.07,"market_value_try":3.52,"platform":"İş Bankası"},{"code":"TGE","name":"İş Emtia Yabancı BY","qty":1744.0,"unit_price":0.2819539603804993,"market_value_try":491.7277069035908,"platform":"İş Bankası"},{"code":"TTA","name":"İş Altın Fonu","qty":3873.0,"unit_price":0.6146539144470297,"market_value_try":2380.5546106533457,"platform":"İş Bankası"},{"code":"HVS","name":"HSBC PORTFÖY HİSSE","qty":26523.0,"unit_price":1.5787502490606558,"market_value_try":41873.192855835776,"platform":"İş Bankası"},{"code":"AAV","name":"ATA PORTFÖY İKİNCİ","qty":10.0,"unit_price":61.733226,"market_value_try":617.33,"platform":"İş Bankası"},{"code":"YTD","name":"YAPI KREDİ PORTFÖY","qty":1747.0,"unit_price":0.8245108709426375,"market_value_try":1440.4204915367877,"platform":"İş Bankası"},{"code":"TCD","name":"TACİRLER PORTFÖY DE","qty":36.0,"unit_price":45.33824189006328,"market_value_try":1632.176708042278,"platform":"İş Bankası"},{"code":"MAC","name":"MARMARA CAPITAL POR","qty":42966.0,"unit_price":0.7747744412193428,"market_value_try":33288.95864143028,"platform":"İş Bankası"},{"code":"AN1","name":"STRATEJİ PORTFÖY Bİ","qty":15.0,"unit_price":98.07242609163049,"market_value_try":1471.0863913744574,"platform":"İş Bankası"},{"code":"GSP","name":"AZİMUT PYŞ KAR PAYI","qty":1589.0,"unit_price":0.543136,"market_value_try":863.04,"platform":"İş Bankası"},{"code":"GBG","name":"INVEO PORTFÖY G-20","qty":1913.0,"unit_price":0.5238444447385391,"market_value_try":1002.1144227848253,"platform":"İş Bankası"},{"code":"DBH","name":"DENİZ PORTFÖY EUROB","qty":37300.0,"unit_price":0.353785928662873,"market_value_try":13196.215139125163,"platform":"İş Bankası"},{"code":"IPV","name":"İŞ PORTFÖY EUROBOND","qty":11.0,"unit_price":73.00973098267986,"market_value_try":803.1070408094783,"platform":"İş Bankası"},{"code":"OPH","name":"OSMANLI PORTFÖY BİR","qty":119.0,"unit_price":24.283820843569913,"market_value_try":2889.7746803848195,"platform":"İş Bankası"},{"code":"ZDZ","name":"ZİRAAT PORTFÖY AGRE","qty":25.0,"unit_price":12.78733889673099,"market_value_try":319.68347241827473,"platform":"İş Bankası"},{"code":"MKG","name":"AKTİF PORTFÖY ALTIN","qty":1501.0,"unit_price":17.276508393442374,"market_value_try":25932.039098557,"platform":"İş Bankası"},{"code":"YZG","name":"YAPI KREDİ PORTFÖY","qty":3020.0,"unit_price":14.31754580932711,"market_value_try":43238.98834416787,"platform":"İş Bankası"},{"code":"ITP","name":"İŞ PORTFÖY TEKNOLOJ","qty":97.0,"unit_price":11.360480506641139,"market_value_try":1101.9666091441904,"platform":"İş Bankası"},{"code":"OJT","name":"QNB PORTFÖY TEKNOLO","qty":2397.0,"unit_price":11.286496207490904,"market_value_try":27053.731409355696,"platform":"İş Bankası"},{"code":"GJB","name":"INVEO PORTFÖY BİRİN","qty":581.0,"unit_price":10.098541929591418,"market_value_try":5867.252861092614,"platform":"İş Bankası"},{"code":"IJC","name":"İŞ PORTFÖY YARI İLE","qty":151.0,"unit_price":15.322545222332476,"market_value_try":2313.704328572204,"platform":"İş Bankası"},{"code":"ZFB","name":"AK PORTFÖY FİNTEK V","qty":173.0,"unit_price":6.792403227454388,"market_value_try":1175.085758349609,"platform":"İş Bankası"},{"code":"YJK","name":"YAPI KREDİ PORTFÖY","qty":322.0,"unit_price":5.148933867559435,"market_value_try":1657.9567053541382,"platform":"İş Bankası"},{"code":"OLD","name":"QNB PORTFÖY TEMİZ E","qty":292.0,"unit_price":3.1230422207818997,"market_value_try":911.9283284683147,"platform":"İş Bankası"},{"code":"DHM","name":"DENİZ PORTFÖY ESG-S","qty":786.0,"unit_price":5.124598064040817,"market_value_try":4027.934078336082,"platform":"İş Bankası"},{"code":"DMG","name":"DENİZ PORTFÖY GÜMÜŞ","qty":6424.0,"unit_price":7.346075855040876,"market_value_try":47191.19129278259,"platform":"İş Bankası"},{"code":"IEV","name":"İŞ PORTFÖY TAŞIMACI","qty":538.0,"unit_price":4.751573618840155,"market_value_try":2556.3466069360034,"platform":"İş Bankası"},{"code":"GVI","name":"GARANTİ PORTFÖY ÜÇÜ","qty":822.0,"unit_price":5.39568163437179,"market_value_try":4435.250303453612,"platform":"İş Bankası"},{"code":"DVT","name":"DENİZ PORTFÖY METAV","qty":132.0,"unit_price":8.56796056022619,"market_value_try":1130.9707939498571,"platform":"İş Bankası"},{"code":"NHY","name":"NEO PORTFÖY BİRİNCİ","qty":57.0,"unit_price":5.522726,"market_value_try":314.79,"platform":"İş Bankası"},{"code":"RTG","name":"ATA PORTFÖY ROBOTİK","qty":401.0,"unit_price":5.166719200553178,"market_value_try":2071.8543994218244,"platform":"İş Bankası"},{"code":"CPU","name":"AKTİF PORTFÖY TEKNO","qty":228.0,"unit_price":3.308619223346385,"market_value_try":754.3651829229758,"platform":"İş Bankası"},{"code":"CPT","name":"ROTA PORTFÖY ÇİP TE","qty":719.0,"unit_price":3.487237774800767,"market_value_try":2507.3239600817515,"platform":"İş Bankası"},{"code":"GPT","name":"AKTİF PORTFÖY ROBOT","qty":439.0,"unit_price":2.5864251230772535,"market_value_try":1135.4406290309144,"platform":"İş Bankası"},{"code":"JET","name":"ATA PORTFÖY HAVACIL","qty":1183.0,"unit_price":2.19595907052801,"market_value_try":2597.8195804346356,"platform":"İş Bankası"},{"code":"KPH","name":"İŞ PORTFÖY KAR PAYI","qty":9008.0,"unit_price":1.331115,"market_value_try":11990.68,"platform":"İş Bankası"},{"code":"GID","name":"GARANTİ PORTFÖY İNŞ","qty":927.0,"unit_price":1.6723829602312361,"market_value_try":1550.299004134356,"platform":"İş Bankası"},{"code":"NPH","name":"NUROL PORTFÖY BİRİN","qty":839.0,"unit_price":1.71588,"market_value_try":1439.62,"platform":"İş Bankası"},{"code":"URA","name":"ATA PORTFÖY ENERJİ","qty":526.0,"unit_price":1.9424132087001957,"market_value_try":1021.7093477763029,"platform":"İş Bankası"},{"code":"BDS","name":"Pardus Portföy BIST","qty":420.0,"unit_price":2.4506190476190475,"market_value_try":1029.26,"platform":"Midas"},{"code":"KHA","name":"Pardus Portföy İkinc","qty":1085.0,"unit_price":3.2802857142857142,"market_value_try":3559.11,"platform":"Midas"}],"gold":[{"type":"Çeyrek Altın","qty":25,"total_gram":40.2,"cost_try":149824,"current_value_try":270600,"profit_try":120776,"profit_pct":0.806},{"type":"Bilezik","qty":2,"total_gram":18.32,"cost_try":109672,"current_value_try":121401,"profit_try":11729,"profit_pct":0.107}],"gold_total":{"type":"TOPLAM ALTIN","qty":27,"total_gram":58.52,"cost_try":259496,"current_value_try":392001,"profit_try":132505,"profit_pct":0.510624},"crypto_etf":[{"asset":"Bitcoin","type":"Kripto Para","qty":0.0102686,"avg_cost":2989018.72,"current_price":3451611.71,"currency":"TRY","total_value_try":35443.22,"profit_pct":0.15476416604151588},{"asset":"VOO","type":"ETF (S&P 500)","qty":0.83390021,"avg_cost":632.35,"current_price":660.5826,"currency":"USD","total_value_try":24631.704900000004,"profit_pct":0.04464109639309913}],"usd_try_rate":"44,715"},"MAYIS":{"report_date":"31.05.2026","sheet_name":"MAYIS","display_name":"Mayıs","summary":[{"category":"📈 Hisse Senetleri","value_try":354143.68,"pct":0.3434404886813795,"platform":"Midas","comment":"19 pozisyon, BIST","clean_name":"Hisse Senetleri","key":"hisse"},{"category":"📊 Yatırım Fonları","value_try":223854.25570237148,"pct":0.21708876739471658,"platform":"İş B./Midas","comment":"39 fon","clean_name":"Yatırım Fonları","key":"fon"},{"category":"🥇 Fiziki Altın","value_try":387156,"pct":0.3754550860146033,"platform":"Midas","comment":"Çeyrek (25) + Bilezik (2)","clean_name":"Fiziki Altın","key":"altin"},{"category":"🔗 Bitcoin","value_try":39745.29,"pct":0.038544078551347144,"platform":"Midas","comment":"0.0117092 BTC","clean_name":"Bitcoin","key":"bitcoin"},{"category":"🌐 VOO (S&P 500 ETF)","value_try":26265.391375000003,"pct":0.0254715793579535,"platform":"Midas","comment":"$695.49","clean_name":"VOO (S&P 500 ETF)","key":"voo"}],"total_try":1031164.6170773715,"stocks":[{"code":"EREGL","name":"Ereğli Demir ve Çeli","qty":522.0,"avg_cost":24.57,"pnl":7628.8,"market_value_try":20451.96,"price":39.18,"sector":"Metal","platform":"Midas","pct":0.01983384579075935},{"code":"TTRAK","name":"Türk Traktör ve Zira","qty":24.0,"avg_cost":529.17,"pnl":-1918.0,"market_value_try":10782.0,"price":449.25,"sector":"Tarım Mak.","platform":"Midas","pct":0.010456138449125038},{"code":"ENJSA","name":"Enerjisa Enerji","qty":163.0,"avg_cost":80.17,"pnl":4829.04,"market_value_try":17897.4,"price":109.80000000000001,"sector":"Enerji","platform":"Midas","pct":0.01735649158591824},{"code":"MAVI","name":"Mavi Giyim","qty":268.0,"avg_cost":37.7,"pnl":942.82,"market_value_try":11046.96,"price":41.22,"sector":"Perakende","platform":"Midas","pct":0.010713090632716223},{"code":"RYSAS","name":"Reysaş Taşımacılık v","qty":406.0,"avg_cost":15.58,"pnl":2687.97,"market_value_try":9013.2,"price":22.200000000000003,"sector":"Lojistik","platform":"Midas","pct":0.008740796426419385},{"code":"TUPRS","name":"Tüpraş - Türkiye Pet","qty":145.0,"avg_cost":195.1,"pnl":5959.82,"market_value_try":34249.0,"price":236.2,"sector":"Enerji","platform":"Midas","pct":0.03321390147876863},{"code":"AGESA","name":"Agesa Hayat Emeklili","qty":6.0,"avg_cost":237.73,"pnl":-42.8,"market_value_try":1383.6,"price":230.6,"sector":"Sigorta","platform":"Midas","pct":0.0013417838210173809},{"code":"AKSA","name":"Aksa Akrilik Kimya","qty":624.0,"avg_cost":10.15,"pnl":170.85,"market_value_try":6502.08,"price":10.42,"sector":"Kimya","platform":"Midas","pct":0.006305569345880813},{"code":"LOGO","name":"Logo Yazılım","qty":55.0,"avg_cost":145.18,"pnl":715.9,"market_value_try":8701.0,"price":158.2,"sector":"Teknoloji","platform":"Midas","pct":0.008438031964926446},{"code":"MGROS","name":"Migros Ticaret","qty":22.0,"avg_cost":582.43,"pnl":1684.6,"market_value_try":14498.0,"price":659.0,"sector":"Perakende","platform":"Midas","pct":0.014059830758246596},{"code":"SISE","name":"Türkiye Şişe ve Cam","qty":911.0,"avg_cost":41.47,"pnl":3945.64,"market_value_try":41723.8,"price":45.800000000000004,"sector":"Cam/Sanayi","platform":"Midas","pct":0.04046279256386601},{"code":"ENKAI","name":"Enka İnşaat","qty":304.0,"avg_cost":87.26,"pnl":4024.9,"market_value_try":30552.0,"price":100.5,"sector":"İnşaat","platform":"Midas","pct":0.029628634937643124},{"code":"ISMEN","name":"İş Yatırım Menkul De","qty":983.0,"avg_cost":38.68,"pnl":-590.53,"market_value_try":37432.64,"price":38.08,"sector":"Finans","platform":"Midas","pct":0.036301323164186224},{"code":"TABGD","name":"Tab Gıda San. ve Tic","qty":42.0,"avg_cost":229.41,"pnl":1578.8,"market_value_try":11214.0,"price":267.0,"sector":"Gıda","platform":"Midas","pct":0.010875082226719363},{"code":"CLEBI","name":"Çelebi Hava Servisi","qty":11.0,"avg_cost":1597.59,"pnl":653.56,"market_value_try":18227.0,"price":1657.0,"sector":"Havacılık","platform":"Midas","pct":0.0176761301717865},{"code":"RYGYO","name":"Reysaş Gayrimenkul Y","qty":1228.0,"avg_cost":22.31,"pnl":11258.36,"market_value_try":38657.44,"price":31.48,"sector":"GYO","platform":"Midas","pct":0.03748910635584717},{"code":"MPARK","name":"MLP Sağlık Hizmetler","qty":30.0,"avg_cost":450.63,"pnl":71.0,"market_value_try":13590.0,"price":453.0,"sector":"Sağlık","platform":"Midas","pct":0.013179273003488153},{"code":"GWIND","name":"Galata Wind Enerji","qty":924.0,"avg_cost":25.29,"pnl":1485.76,"market_value_try":24855.6,"price":26.9,"sector":"Enerji","platform":"Midas","pct":0.024104395736975724},{"code":"FROTO","name":"Ford Otomotiv","qty":40.0,"avg_cost":86.36,"pnl":-88.59,"market_value_try":3366.0,"price":84.15,"sector":"Otomotiv","platform":"Midas","pct":0.0032642702670891187}],"funds":[{"code":"KOCMT","name":"Eski","qty":0.285,"unit_price":2.62,"market_value_try":0.74,"platform":"İş Bankası"},{"code":"PATEK","name":"Eski","qty":0.82,"unit_price":23.78,"market_value_try":19.49,"platform":"İş Bankası"},{"code":"BINHO","name":"Eski","qty":0.35,"unit_price":9.06,"market_value_try":3.17,"platform":"İş Bankası"},{"code":"TGE","name":"İş Emtia Yabancı BY","qty":1744.0,"unit_price":0.29119697510969283,"market_value_try":507.8475245913043,"platform":"İş Bankası"},{"code":"TTA","name":"İş Altın Fonu","qty":3873.0,"unit_price":0.6180468040547773,"market_value_try":2393.6952721041525,"platform":"İş Bankası"},{"code":"YTD","name":"YAPI KREDİ PORTFÖY","qty":1747.0,"unit_price":0.9074203860811455,"market_value_try":1585.2634144837612,"platform":"İş Bankası"},{"code":"TCD","name":"TACİRLER PORTFÖY DE","qty":36.0,"unit_price":45.751137258956085,"market_value_try":1647.040941322419,"platform":"İş Bankası"},{"code":"AN1","name":"STRATEJİ PORTFÖY Bİ","qty":15.0,"unit_price":101.25821078079102,"market_value_try":1518.8731617118654,"platform":"İş Bankası"},{"code":"GBG","name":"INVEO PORTFÖY G-20","qty":1913.0,"unit_price":0.5637236746275945,"market_value_try":1078.4033895625882,"platform":"İş Bankası"},{"code":"DBH","name":"DENİZ PORTFÖY EUROB","qty":37300.0,"unit_price":0.35708427487579697,"market_value_try":13319.243452867227,"platform":"İş Bankası"},{"code":"IPV","name":"İŞ PORTFÖY EUROBOND","qty":11.0,"unit_price":73.62987563764673,"market_value_try":809.9286320141141,"platform":"İş Bankası"},{"code":"ZDZ","name":"ZİRAAT PORTFÖY AGRE","qty":25.0,"unit_price":12.380727094492737,"market_value_try":309.51817736231845,"platform":"İş Bankası"},{"code":"MKG","name":"AKTİF PORTFÖY ALTIN","qty":1501.0,"unit_price":17.351989458613325,"market_value_try":26045.336177378602,"platform":"İş Bankası"},{"code":"YZG","name":"YAPI KREDİ PORTFÖY","qty":3020.0,"unit_price":15.152931654663917,"market_value_try":45761.85359708503,"platform":"İş Bankası"},{"code":"ITP","name":"İŞ PORTFÖY TEKNOLOJ","qty":97.0,"unit_price":12.382026274278816,"market_value_try":1201.0565486050452,"platform":"İş Bankası"},{"code":"OJT","name":"QNB PORTFÖY TEKNOLO","qty":2397.0,"unit_price":12.645593507804543,"market_value_try":30311.48763820749,"platform":"İş Bankası"},{"code":"GJB","name":"INVEO PORTFÖY BİRİN","qty":581.0,"unit_price":10.497202069345898,"market_value_try":6098.874402289966,"platform":"İş Bankası"},{"code":"IJC","name":"İŞ PORTFÖY YARI İLE","qty":151.0,"unit_price":17.996344686174716,"market_value_try":2717.448047612382,"platform":"İş Bankası"},{"code":"ZFB","name":"AK PORTFÖY FİNTEK V","qty":173.0,"unit_price":7.347879170992381,"market_value_try":1271.1830965816819,"platform":"İş Bankası"},{"code":"YJK","name":"YAPI KREDİ PORTFÖY","qty":322.0,"unit_price":5.722710462024789,"market_value_try":1842.7127687719822,"platform":"İş Bankası"},{"code":"OLD","name":"QNB PORTFÖY TEMİZ E","qty":292.0,"unit_price":3.2456153818631477,"market_value_try":947.7196915040391,"platform":"İş Bankası"},{"code":"DHM","name":"DENİZ PORTFÖY ESG-S","qty":786.0,"unit_price":5.163888357397818,"market_value_try":4058.816248914685,"platform":"İş Bankası"},{"code":"DMG","name":"DENİZ PORTFÖY GÜMÜŞ","qty":6424.0,"unit_price":7.76445691321302,"market_value_try":49878.871210480436,"platform":"İş Bankası"},{"code":"IEV","name":"İŞ PORTFÖY TAŞIMACI","qty":538.0,"unit_price":4.834764169758809,"market_value_try":2601.103123330239,"platform":"İş Bankası"},{"code":"GVI","name":"GARANTİ PORTFÖY ÜÇÜ","qty":822.0,"unit_price":5.334564748499261,"market_value_try":4385.0122232663925,"platform":"İş Bankası"},{"code":"DVT","name":"DENİZ PORTFÖY METAV","qty":132.0,"unit_price":9.700722057933135,"market_value_try":1280.4953116471738,"platform":"İş Bankası"},{"code":"RTG","name":"ATA PORTFÖY ROBOTİK","qty":401.0,"unit_price":5.7832328024399855,"market_value_try":2319.076353778434,"platform":"İş Bankası"},{"code":"CPU","name":"AKTİF PORTFÖY TEKNO","qty":228.0,"unit_price":3.8041577416654198,"market_value_try":867.3479650997157,"platform":"İş Bankası"},{"code":"CPT","name":"ROTA PORTFÖY ÇİP TE","qty":719.0,"unit_price":3.873355202940032,"market_value_try":2784.942390913883,"platform":"İş Bankası"},{"code":"GPT","name":"AKTİF PORTFÖY ROBOT","qty":439.0,"unit_price":2.894028662964831,"market_value_try":1270.4785830415608,"platform":"İş Bankası"},{"code":"JET","name":"ATA PORTFÖY HAVACIL","qty":1183.0,"unit_price":2.2060187590300986,"market_value_try":2609.7201919326067,"platform":"İş Bankası"},{"code":"GID","name":"GARANTİ PORTFÖY İNŞ","qty":927.0,"unit_price":1.6529983693391959,"market_value_try":1532.3294883774345,"platform":"İş Bankası"},{"code":"URA","name":"ATA PORTFÖY ENERJİ","qty":526.0,"unit_price":1.9220392365541394,"market_value_try":1010.9926384274773,"platform":"İş Bankası"},{"code":"BDS","name":"Pardus Portföy BIST","qty":420.0,"unit_price":2.3840714285714286,"market_value_try":1001.31,"platform":"Midas"},{"code":"KHA","name":"Pardus Portföy İkinc","qty":1085.0,"unit_price":3.2439907834101382,"market_value_try":3519.73,"platform":"Midas"},{"code":"GO9","name":"One Portföy Birinci","qty":777.0,"unit_price":2.5294851994851997,"market_value_try":1965.41,"platform":"Midas"},{"code":"HVS","name":"Hsbc Portföy Hisse S","qty":637.0,"unit_price":1.5559704617169594,"market_value_try":991.1531841137031,"platform":"Midas"},{"code":"OPH","name":"Osmanlı Portföy Biri","qty":41.0,"unit_price":25.08817384137148,"market_value_try":1028.6151274962306,"platform":"Midas"},{"code":"MAC","name":"Marmara Capital Port","qty":1693.0,"unit_price":0.8021061591822376,"market_value_try":1357.9657274955282,"platform":"Midas"}],"gold":[{"type":"Çeyrek Altın","qty":25,"total_gram":40.2,"cost_try":149824,"current_value_try":266900,"profit_try":117076,"profit_pct":0.781423536950021},{"type":"Bilezik","qty":2,"total_gram":18.32,"cost_try":109672,"current_value_try":120256,"profit_try":10584,"profit_pct":0.0965059449996353}],"gold_total":{"type":"TOPLAM ALTIN","qty":27,"total_gram":58.52,"cost_try":259496,"current_value_try":387156,"profit_try":127660,"profit_pct":0.491953633196658},"crypto_etf":[{"asset":"Bitcoin","type":"Kripto Para","qty":0.0117092,"avg_cost":3051289.09,"current_price":3394364.26,"currency":"TRY","total_value_try":39745.29,"profit_pct":0.11243614107420531},{"asset":"VOO","type":"ETF (S&P 500)","qty":0.83390021,"avg_cost":632.35,"current_price":695.4909,"currency":"USD","total_value_try":26265.391375000003,"profit_pct":0.09984510302024932}],"usd_try_rate":"45,2875"},"HAZİRAN":{"report_date":"30.06.2026","sheet_name":"HAZİRAN","display_name":"Haziran","summary":[{"category":"📈 Hisse Senetleri","value_try":406503.84,"pct":0.3797489223528835,"platform":"Midas","comment":"19 pozisyon, BIST","clean_name":"Hisse Senetleri","key":"hisse"},{"category":"📊 Yatırım Fonları","value_try":214817.89028746152,"pct":0.20067919244940827,"platform":"İş B./Midas","comment":"38 fon","clean_name":"Yatırım Fonları","key":"fon"},{"category":"🥇 Fiziki Altın","value_try":363993,"pct":0.34003602399916594,"platform":"Midas","comment":"Çeyrek (25) + Bilezik (2)","clean_name":"Fiziki Altın","key":"altin"},{"category":"🔗 Bitcoin","value_try":58622.1,"pct":0.05476376139783322,"platform":"Midas","comment":"0.0205038 BTC","clean_name":"Bitcoin","key":"bitcoin"},{"category":"🌐 VOO (S&P 500 ETF)","value_try":26517.398999999998,"pct":0.024772099800708967,"platform":"Midas","comment":"$686.81","clean_name":"VOO (S&P 500 ETF)","key":"voo"}],"total_try":1070454.2292874616,"stocks":[{"code":"TTRAK","name":"Türk Traktör ve Zira","qty":24.0,"avg_cost":529.17,"pnl":-2176.0,"market_value_try":10524.0,"price":438.5,"sector":"Tarım Mak.","platform":"Midas","pct":0.009831340483380786},{"code":"RYSAS","name":"Reysaş Taşımacılık v","qty":406.0,"avg_cost":15.58,"pnl":2582.41,"market_value_try":8907.64,"price":21.939999999999998,"sector":"Lojistik","platform":"Midas","pct":0.00832136466584778},{"code":"AGESA","name":"Agesa Hayat Emeklili","qty":6.0,"avg_cost":237.73,"pnl":75.1,"market_value_try":1501.5,"price":250.25,"sector":"Sigorta","platform":"Midas","pct":0.0014026755735268197},{"code":"FROTO","name":"Ford Otomotiv","qty":40.0,"avg_cost":86.36,"pnl":-72.59,"market_value_try":3382.0,"price":84.55,"sector":"Otomotiv","platform":"Midas","pct":0.0031594064533251444},{"code":"EREGL","name":"Ereğli Demir ve Çeli","qty":522.0,"avg_cost":24.24,"pnl":8479.37,"market_value_try":21130.56,"price":40.480000000000004,"sector":"Metal","platform":"Midas","pct":0.01973980710419106},{"code":"SISE","name":"Türkiye Şişe ve Cam","qty":931.0,"avg_cost":41.01,"pnl":3067.29,"market_value_try":41243.3,"price":44.300000000000004,"sector":"Cam/Sanayi","platform":"Midas","pct":0.03852878420355557},{"code":"ENJSA","name":"Enerjisa Enerji","qty":173.0,"avg_cost":81.58,"pnl":3601.84,"market_value_try":17715.2,"price":102.4,"sector":"Enerji","platform":"Midas","pct":0.016549236310451094},{"code":"CLEBI","name":"Çelebi Hava Servisi","qty":12.0,"avg_cost":1599.2,"pnl":-194.44,"market_value_try":18996.0,"price":1583.0,"sector":"Havacılık","platform":"Midas","pct":0.017745737725418226},{"code":"AKSA","name":"Aksa Akrilik Kimya","qty":724.0,"avg_cost":10.23,"pnl":1351.17,"market_value_try":8760.4,"price":12.1,"sector":"Kimya","platform":"Midas","pct":0.0081838155806356},{"code":"ISMEN","name":"İş Yatırım Menkul De","qty":1033.0,"avg_cost":38.57,"pnl":-2548.27,"market_value_try":37291.3,"price":36.1,"sector":"Finans","platform":"Midas","pct":0.03483689351652394},{"code":"GWIND","name":"Galata Wind Enerji","qty":1004.0,"avg_cost":25.39,"pnl":94.48,"market_value_try":25581.92,"price":25.479999999999997,"sector":"Enerji","platform":"Midas","pct":0.023898191347264213},{"code":"MAVI","name":"Mavi Giyim","qty":368.0,"avg_cost":39.1,"pnl":-535.72,"market_value_try":13851.52,"price":37.64,"sector":"Perakende","platform":"Midas","pct":0.012939852654157985},{"code":"LOGO","name":"Logo Yazılım","qty":71.0,"avg_cost":140.73,"pnl":-236.5,"market_value_try":9755.4,"price":137.4,"sector":"Teknoloji","platform":"Midas","pct":0.009113327532456568},{"code":"MGROS","name":"Migros Ticaret","qty":23.0,"avg_cost":586.78,"pnl":1902.6,"market_value_try":15398.5,"price":669.5,"sector":"Perakende","platform":"Midas","pct":0.014385014864437384},{"code":"ENKAI","name":"Enka İnşaat","qty":409.0,"avg_cost":88.87,"pnl":666.65,"market_value_try":37014.5,"price":90.5,"sector":"İnşaat","platform":"Midas","pct":0.034578311699173137},{"code":"TUPRS","name":"Tüpraş - Türkiye Pet","qty":227.0,"avg_cost":207.52,"pnl":4535.02,"market_value_try":51642.5,"price":227.5,"sector":"Enerji","platform":"Midas","pct":0.048243538665240615},{"code":"RYGYO","name":"Reysaş Gayrimenkul Y","qty":1470.0,"avg_cost":23.9,"pnl":8818.46,"market_value_try":43953.0,"price":29.9,"sector":"GYO","platform":"Midas","pct":0.041060139515966904},{"code":"TABGD","name":"Tab Gıda San. ve Tic","qty":87.0,"avg_cost":240.02,"pnl":-1237.29,"market_value_try":19644.6,"price":225.79999999999998,"sector":"Gıda","platform":"Midas","pct":0.018351648732404236},{"code":"MPARK","name":"MLP Sağlık Hizmetler","qty":47.0,"avg_cost":444.9,"pnl":-700.5,"market_value_try":20210.0,"price":430.0,"sector":"Sağlık","platform":"Midas","pct":0.018879835724926426}],"funds":[{"code":"KOCMT","name":"Eski","qty":0.285,"unit_price":3.68,"market_value_try":1.04,"platform":"İş Bankası"},{"code":"PATEK","name":"Eski","qty":0.82,"unit_price":22.54,"market_value_try":18.48,"platform":"İş Bankası"},{"code":"BINHO","name":"Eski","qty":0.35,"unit_price":10.98,"market_value_try":3.84,"platform":"İş Bankası"},{"code":"TGE","name":"İş Emtia Yabancı BY","qty":1744.0,"unit_price":0.26500206001672527,"market_value_try":462.16359266916885,"platform":"İş Bankası"},{"code":"TTA","name":"İş Altın Fonu","qty":3873.0,"unit_price":0.5660820468166556,"market_value_try":2192.4357673209074,"platform":"İş Bankası"},{"code":"YTD","name":"YAPI KREDİ PORTFÖY","qty":1747.0,"unit_price":0.9516707412083926,"market_value_try":1662.5687848910618,"platform":"İş Bankası"},{"code":"TCD","name":"TACİRLER PORTFÖY DE","qty":36.0,"unit_price":47.62766590476942,"market_value_try":1714.5959725716991,"platform":"İş Bankası"},{"code":"AN1","name":"STRATEJİ PORTFÖY Bİ","qty":15.0,"unit_price":107.85305679073315,"market_value_try":1617.7958518609971,"platform":"İş Bankası"},{"code":"GBG","name":"INVEO PORTFÖY G-20","qty":1913.0,"unit_price":0.5880269296881394,"market_value_try":1124.8955164934107,"platform":"İş Bankası"},{"code":"DBH","name":"DENİZ PORTFÖY EUROB","qty":37300.0,"unit_price":0.37167438126294716,"market_value_try":13863.454421107928,"platform":"İş Bankası"},{"code":"IPV","name":"İŞ PORTFÖY EUROBOND","qty":11.0,"unit_price":75.61228640931473,"market_value_try":831.735150502462,"platform":"İş Bankası"},{"code":"ZDZ","name":"ZİRAAT PORTFÖY AGRE","qty":25.0,"unit_price":12.49867828152197,"market_value_try":312.46695703804926,"platform":"İş Bankası"},{"code":"MKG","name":"AKTİF PORTFÖY ALTIN","qty":1501.0,"unit_price":15.869400775290485,"market_value_try":23819.970563711016,"platform":"İş Bankası"},{"code":"YZG","name":"YAPI KREDİ PORTFÖY","qty":3020.0,"unit_price":11.676106639432936,"market_value_try":35261.842051087464,"platform":"İş Bankası"},{"code":"ITP","name":"İŞ PORTFÖY TEKNOLOJ","qty":97.0,"unit_price":12.732549056077374,"market_value_try":1235.0572584395054,"platform":"İş Bankası"},{"code":"OJT","name":"QNB PORTFÖY TEKNOLO","qty":2397.0,"unit_price":12.807988219631769,"market_value_try":30700.74776245735,"platform":"İş Bankası"},{"code":"GJB","name":"INVEO PORTFÖY BİRİN","qty":581.0,"unit_price":10.593702847969395,"market_value_try":6154.941354670218,"platform":"İş Bankası"},{"code":"IJC","name":"İŞ PORTFÖY YARI İLE","qty":151.0,"unit_price":17.768079050175274,"market_value_try":2682.9799365764666,"platform":"İş Bankası"},{"code":"ZFB","name":"AK PORTFÖY FİNTEK V","qty":173.0,"unit_price":7.156657963446475,"market_value_try":1238.1018276762402,"platform":"İş Bankası"},{"code":"YJK","name":"YAPI KREDİ PORTFÖY","qty":322.0,"unit_price":5.873698454854851,"market_value_try":1891.330902463262,"platform":"İş Bankası"},{"code":"OLD","name":"QNB PORTFÖY TEMİZ E","qty":292.0,"unit_price":3.2372254661010316,"market_value_try":945.2698361015013,"platform":"İş Bankası"},{"code":"DHM","name":"DENİZ PORTFÖY ESG-S","qty":786.0,"unit_price":5.22520436775356,"market_value_try":4107.010633054298,"platform":"İş Bankası"},{"code":"DMG","name":"DENİZ PORTFÖY GÜMÜŞ","qty":6424.0,"unit_price":6.08311035539822,"market_value_try":39077.90092307817,"platform":"İş Bankası"},{"code":"IEV","name":"İŞ PORTFÖY HAVACILI","qty":538.0,"unit_price":5.204522098697792,"market_value_try":2800.032889099412,"platform":"İş Bankası"},{"code":"GVI","name":"GARANTİ PORTFÖY ÜÇÜ","qty":822.0,"unit_price":5.485516927187545,"market_value_try":4509.094914148162,"platform":"İş Bankası"},{"code":"DVT","name":"DENİZ PORTFÖY METAV","qty":132.0,"unit_price":9.689081191463615,"market_value_try":1278.9587172731972,"platform":"İş Bankası"},{"code":"RTG","name":"ATA PORTFÖY ROBOTİK","qty":401.0,"unit_price":6.093451193195669,"market_value_try":2443.4739284714633,"platform":"İş Bankası"},{"code":"CPU","name":"AKTİF PORTFÖY TEKNO","qty":228.0,"unit_price":3.9112257613045935,"market_value_try":891.7594735774474,"platform":"İş Bankası"},{"code":"CPT","name":"ROTA PORTFÖY ÇİP TE","qty":719.0,"unit_price":4.1696087756369,"market_value_try":2997.948709682931,"platform":"İş Bankası"},{"code":"GPT","name":"AKTİF PORTFÖY ROBOT","qty":439.0,"unit_price":2.965953957325496,"market_value_try":1302.0537872658929,"platform":"İş Bankası"},{"code":"JET","name":"ATA PORTFÖY HAVACIL","qty":1183.0,"unit_price":2.243123994556985,"market_value_try":2653.6156855609133,"platform":"İş Bankası"},{"code":"GID","name":"GARANTİ PORTFÖY İNŞ","qty":927.0,"unit_price":1.6738922687276432,"market_value_try":1551.6981331105253,"platform":"İş Bankası"},{"code":"URA","name":"ATA PORTFÖY ENERJİ","qty":526.0,"unit_price":1.7888976565987977,"market_value_try":940.9601673709676,"platform":"İş Bankası"},{"code":"GO9","name":"One Portföy Birinci","qty":777.0,"unit_price":2.570759330759331,"market_value_try":1997.48,"platform":"Midas"},{"code":"HVS","name":"Hsbc Portföy Hisse S","qty":1282.0,"unit_price":1.599224884582229,"market_value_try":2050.2063020344176,"platform":"Midas"},{"code":"KHA","name":"Pardus Portföy İkinc","qty":1279.0,"unit_price":3.600375293197811,"market_value_try":4604.88,"platform":"Midas"},{"code":"OPH","name":"Osmanlı Portföy Biri","qty":221.0,"unit_price":25.291814548441888,"market_value_try":5589.491015205657,"platform":"Midas"},{"code":"MAC","name":"Marmara Capital Port","qty":10336.0,"unit_price":0.8016264996990466,"market_value_try":8285.611500889347,"platform":"Midas"}],"gold":[{"type":"Çeyrek Altın","qty":25,"total_gram":40.2,"cost_try":149824,"current_value_try":251750,"profit_try":101926,"profit_pct":0.680304891072191},{"type":"Bilezik","qty":2,"total_gram":18.32,"cost_try":109672,"current_value_try":112243,"profit_try":2571,"profit_pct":0.0234426289299001}],"gold_total":{"type":"TOPLAM ALTIN","qty":27,"total_gram":58.52,"cost_try":259496,"current_value_try":363993,"profit_try":104497,"profit_pct":0.402692141690045},"crypto_etf":[{"asset":"Bitcoin","type":"Kripto","qty":0.0205038,"avg_cost":"—","current_price":2859085,"currency":"TRY","total_value_try":58622.1,"profit_pct":null},{"asset":"VOO","type":"ETF (S&P 500)","qty":0.83390021,"avg_cost":632.35,"current_price":686.8088,"currency":"USD","total_value_try":26517.398999999998,"profit_pct":0.0861152161092027}],"usd_try_rate":"46,3"},"TEMMUZ":{"report_date":"31.07.2026","sheet_name":"TEMMUZ","display_name":"Temmuz","summary":[{"category":"📈 Hisse Senetleri","value_try":485118.69,"pct":0.4239490394996715,"platform":"Midas","comment":"18 pozisyon, BIST","clean_name":"Hisse Senetleri","key":"hisse"},{"category":"📊 Yatırım Fonları","value_try":212823.746873,"pct":0.1859883466240593,"platform":"İş B./Midas","comment":"35 fon","clean_name":"Yatırım Fonları","key":"fon"},{"category":"🥇 Fiziki Altın","value_try":357887,"pct":0.312760264708455,"platform":"Midas","comment":"Çeyrek (25) + Bilezik (2)","clean_name":"Fiziki Altın","key":"altin"},{"category":"🔗 Bitcoin","value_try":61183.27,"pct":0.053468540966642754,"platform":"Midas","comment":"0.0205038 BTC","clean_name":"Bitcoin","key":"bitcoin"},{"category":"🌐 VOO (S&P 500 ETF)","value_try":27272.6784,"pct":0.02383380820117122,"platform":"Midas","comment":"$686.65","clean_name":"VOO (S&P 500 ETF)","key":"voo"}],"total_try":1144285.3852730002,"stocks":[{"code":"AGESA","name":"Agesa Hayat Emeklili","qty":6.0,"avg_cost":237.73,"pnl":31.0,"market_value_try":1457.4,"price":242.9,"sector":"Sigorta","platform":"Midas","pct":0.001273633325005106},{"code":"FROTO","name":"Ford Otomotiv","qty":40.0,"avg_cost":86.36,"pnl":-250.59,"market_value_try":3204.0,"price":80.1,"sector":"Otomotiv","platform":"Midas","pct":0.0028000008050750374},{"code":"EREGL","name":"Ereğli Demir ve Çeli","qty":522.0,"avg_cost":24.24,"pnl":9554.69,"market_value_try":22205.88,"price":42.54,"sector":"Metal","platform":"Midas","pct":0.019405893220162194},{"code":"ENJSA","name":"Enerjisa Enerji","qty":173.0,"avg_cost":81.58,"pnl":4726.34,"market_value_try":18839.7,"price":108.9,"sector":"Enerji","platform":"Midas","pct":0.016464162037257236},{"code":"AKSA","name":"Aksa Akrilik Kimya","qty":724.0,"avg_cost":10.23,"pnl":2002.77,"market_value_try":9412.0,"price":13.0,"sector":"Kimya","platform":"Midas","pct":0.00822522084187461},{"code":"LOGO","name":"Logo Yazılım","qty":71.0,"avg_cost":140.73,"pnl":-335.9,"market_value_try":9656.0,"price":136.0,"sector":"Teknoloji","platform":"Midas","pct":0.008438454361362223},{"code":"TUPRS","name":"Tüpraş - Türkiye Pet","qty":227.0,"avg_cost":207.52,"pnl":19914.27,"market_value_try":67021.75,"price":295.25,"sector":"Enerji","platform":"Midas","pct":0.05857083456851994},{"code":"MGROS","name":"Migros Ticaret","qty":25.0,"avg_cost":590.56,"pnl":873.6,"market_value_try":15637.5,"price":625.5,"sector":"Perakende","platform":"Midas","pct":0.013665734266342353},{"code":"TABGD","name":"Tab Gıda San. ve Tic","qty":112.0,"avg_cost":236.28,"pnl":763.31,"market_value_try":27227.2,"price":243.1,"sector":"Gıda","platform":"Midas","pct":0.0237940642696439},{"code":"RYSAS","name":"Reysaş Taşımacılık v","qty":407.0,"avg_cost":15.59,"pnl":2689.13,"market_value_try":9035.4,"price":22.2,"sector":"Lojistik","platform":"Midas","pct":0.007896107139255615},{"code":"MAVI","name":"Mavi Giyim","qty":488.0,"avg_cost":39.21,"pnl":-43.28,"market_value_try":19090.56,"price":39.120000000000005,"sector":"Perakende","platform":"Midas","pct":0.01668339056471077},{"code":"RYGYO","name":"Reysaş Gayrimenkul Y","qty":1656.0,"avg_cost":24.74,"pnl":22449.22,"market_value_try":63424.8,"price":38.300000000000004,"sector":"GYO","platform":"Midas","pct":0.055427431667204506},{"code":"MPARK","name":"MLP Sağlık Hizmetler","qty":67.0,"avg_cost":433.63,"pnl":-1918.0,"market_value_try":27135.0,"price":405.0,"sector":"Sağlık","platform":"Midas","pct":0.02371348996432932},{"code":"SISE","name":"Türkiye Şişe ve Cam","qty":951.0,"avg_cost":41.02,"pnl":682.33,"market_value_try":39694.74,"price":41.739999999999995,"sector":"Cam/Sanayi","platform":"Midas","pct":0.03468954555469547},{"code":"ENKAI","name":"Enka İnşaat","qty":494.0,"avg_cost":88.89,"pnl":-635.2,"market_value_try":43274.4,"price":87.60000000000001,"sector":"İnşaat","platform":"Midas","pct":0.037817838588994755},{"code":"ISMEN","name":"İş Yatırım Menkul De","qty":1103.0,"avg_cost":38.32,"pnl":-4167.55,"market_value_try":38097.62,"price":34.54,"sector":"Finans","platform":"Midas","pct":0.033293809822547704},{"code":"GWIND","name":"Galata Wind Enerji","qty":1249.0,"avg_cost":25.24,"pnl":-1224.9,"market_value_try":30300.74,"price":24.26,"sector":"Enerji","platform":"Midas","pct":0.026480055054422406},{"code":"CLEBI","name":"Çelebi Hava Servisi","qty":28.0,"avg_cost":1540.91,"pnl":-2741.44,"market_value_try":40404.0,"price":1443.0,"sector":"Havacılık","platform":"Midas","pct":0.03530937344826836}],"funds":[{"code":"HVS","name":"HSBC Hisse Senedi (TL) Fonu","qty":1282,"unit_price":1.534202,"market_value_try":1966.846964,"pct":0.00763571189081637,"platform":"Midas"},{"code":"MAC","name":"Marmara Capital Hisse Senedi (TL)","qty":12974,"unit_price":0.771119,"market_value_try":10004.497906,"pct":0.0388395564173094,"platform":"Midas"},{"code":"GO9","name":"One Portföy Birinci Hisse (TL)","qty":777,"unit_price":2.657074,"market_value_try":2064.546498,"pct":0.00801500194598867,"platform":"Midas"},{"code":"OPH","name":"Osmanlı Portföy Birinci Hisse","qty":221,"unit_price":25.091124,"market_value_try":5545.138404,"pct":0.0215273887712828,"platform":"Midas"},{"code":"KHA","name":"Pardus İkinci Hisse (TL)","qty":1279,"unit_price":3.989608,"market_value_try":5102.708632,"pct":0.0198097837248581,"platform":"Midas"},{"code":"ZFB","name":"Ak Portföy Fintek ve Blokzinciri Değ.","qty":173,"unit_price":7.027924,"market_value_try":1215.8308519999998,"pct":0.00472011003589083,"platform":"İş Bankası"},{"code":"MKG","name":"Aktif Portföy Altın Katılım Fonu","qty":1501,"unit_price":16.158208,"market_value_try":24253.470208,"pct":0.0941570514892313,"platform":"İş Bankası"},{"code":"GPT","name":"Aktif Portföy Robotik Tekn. Değ.","qty":439,"unit_price":2.694584,"market_value_try":1182.922376,"pct":0.004592352439036,"platform":"İş Bankası"},{"code":"CPU","name":"Aktif Portföy Teknoloji Katılım","qty":228,"unit_price":3.644179,"market_value_try":830.872812,"pct":0.00322562229114254,"platform":"İş Bankası"},{"code":"URA","name":"Ata Portföy Enerji Değ.","qty":526,"unit_price":1.722941,"market_value_try":906.266966,"pct":0.00351831818906083,"platform":"İş Bankası"},{"code":"JET","name":"Ata Portföy Havacılık & Savunma Değ.","qty":1183,"unit_price":2.24353,"market_value_try":2654.09599,"pct":0.01030375656121,"platform":"İş Bankası"},{"code":"RTG","name":"Ata Portföy Robotik Tekn. Değ.","qty":401,"unit_price":5.398944,"market_value_try":2164.976544,"pct":0.00840489242067912,"platform":"İş Bankası"},{"code":"DMG","name":"Deniz Portföy Gümüş Fon Sepeti","qty":6424,"unit_price":6.024603,"market_value_try":38702.049672,"pct":0.150249463373835,"platform":"İş Bankası"},{"code":"DVT","name":"Deniz Portföy Metaverse Değ.","qty":132,"unit_price":9.223734,"market_value_try":1217.532888,"pct":0.00472671769615198,"platform":"İş Bankası"},{"code":"DBH","name":"Deniz Portföy Eurobond (Döviz)","qty":37300,"unit_price":0.374986,"market_value_try":13986.977799999999,"pct":0.0543003775376825,"platform":"İş Bankası"},{"code":"DHM","name":"Deniz Portföy ESG Sürdürülebilirlik","qty":786,"unit_price":5.109696,"market_value_try":4016.221056,"pct":0.0155918113786947,"platform":"İş Bankası"},{"code":"GVI","name":"Garanti Portföy Üçüncü Fon Sepeti","qty":822,"unit_price":5.346108,"market_value_try":4394.500776,"pct":0.0170603724863593,"platform":"İş Bankası"},{"code":"GID","name":"Garanti Portföy İnşaat Sektörü Değ.","qty":927,"unit_price":1.60271,"market_value_try":1485.71217,"pct":0.00576784584181792,"platform":"İş Bankası"},{"code":"GBG","name":"Inveo G-20 Ülkeleri Yabancı Hisse","qty":1913,"unit_price":0.574714,"market_value_try":1099.427882,"pct":0.00426820932453719,"platform":"İş Bankası"},{"code":"GJB","name":"Inveo Gedik Portföy Birinci Fon Sepeti","qty":581,"unit_price":9.990847,"market_value_try":5804.6821070000005,"pct":0.0225349917904589,"platform":"İş Bankası"},{"code":"OJT","name":"QNB Portföy Teknoloji Fon Sepeti","qty":2397,"unit_price":12.1509,"market_value_try":29125.707300000002,"pct":0.113072096421147,"platform":"İş Bankası"},{"code":"OLD","name":"QNB Portföy Temiz Enerji ve Su Fon Sep.","qty":292,"unit_price":3.101958,"market_value_try":905.771736,"pct":0.00351639560246976,"platform":"İş Bankası"},{"code":"CPT","name":"Rota Portföy Çip Tekn. Değ.","qty":719,"unit_price":3.660437,"market_value_try":2631.854203,"pct":0.0102174092853023,"platform":"İş Bankası"},{"code":"AN1","name":"Strateji Portföy Birinci Değ.","qty":15,"unit_price":108.322649,"market_value_try":1624.839735,"pct":0.0063079681908645,"platform":"İş Bankası"},{"code":"TCD","name":"Tacirler Portföy Değişken Fon","qty":36,"unit_price":45.862918,"market_value_try":1651.065048,"pct":0.00640978034909528,"platform":"İş Bankası"},{"code":"YZG","name":"Yapı Kredi Portföy Gümüş Fon Sep.","qty":3020,"unit_price":11.570181,"market_value_try":34941.94662,"pct":0.13565195573325,"platform":"İş Bankası"},{"code":"YJK","name":"Yapı Kredi Robotik & Yarı İletken Fon","qty":322,"unit_price":5.343233,"market_value_try":1720.521026,"pct":0.0066794230039688,"platform":"İş Bankası"},{"code":"YTD","name":"Yapı Kredi Yabancı Fon Sepeti","qty":1747,"unit_price":0.885601,"market_value_try":1547.144947,"pct":0.00600634074986648,"platform":"İş Bankası"},{"code":"ZDZ","name":"Ziraat Portföy Agresif Değ.","qty":25,"unit_price":12.2933,"market_value_try":307.3325,"pct":0.00119312913899097,"platform":"İş Bankası"},{"code":"IEV","name":"İş Portföy Taşımacılık Değ.","qty":538,"unit_price":5.120162,"market_value_try":2754.647156,"pct":0.0106941172491103,"platform":"İş Bankası"},{"code":"ITP","name":"İş Portföy Teknoloji Karma Fon","qty":97,"unit_price":12.322179,"market_value_try":1195.251363,"pct":0.00464021614900466,"platform":"İş Bankası"},{"code":"IJC","name":"İş Portföy Yarı İletken Tekn. Değ.","qty":151,"unit_price":14.881548,"market_value_try":2247.113748,"pct":0.00872376625109942,"platform":"İş Bankası"},{"code":"IPV","name":"İş Portföy Eurobond (Döviz)","qty":11,"unit_price":76.836903,"market_value_try":845.2059330000001,"pct":0.00328126646908592,"platform":"İş Bankası"},{"code":"TGE","name":"İş Portföy Emtia Yabancı BYF Fon Sep.","qty":1744,"unit_price":0.28108,"market_value_try":490.20351999999997,"pct":0.00190307274286951,"platform":"İş Bankası"},{"code":"TTA","name":"İş Portföy Altın Fonu","qty":3873,"unit_price":0.577295,"market_value_try":2235.863535,"pct":0.00868009056775921,"platform":"İş Bankası"}],"gold":[{"type":"Çeyrek Altın","qty":25,"total_gram":40.2,"cost_try":149824,"current_value_try":246475,"profit_try":96651,"profit_pct":0.645096913712089},{"type":"Bilezik","qty":2,"total_gram":18.32,"cost_try":109672,"current_value_try":111412,"profit_try":1740,"profit_pct":0.0158654898242031}],"gold_total":{"type":"TOPLAM ALTIN","qty":27,"total_gram":58.52,"cost_try":259496,"current_value_try":357887,"profit_try":98391,"profit_pct":0.379161913863798},"crypto_etf":[{"asset":"Bitcoin","type":"Kripto Para","qty":0.0205038,"avg_cost":3045919.78,"current_price":2983996.63,"currency":"TRY","total_value_try":61183.27,"profit_pct":-0.02032987059959577},{"asset":"VOO","type":"ETF (S&P 500)","qty":0.835828343,"avg_cost":632.47,"current_price":686.6482,"currency":"USD","total_value_try":27272.6784,"profit_pct":0.08565434408807654}],"usd_try_rate":"47,52"}};

const MONTH_ORDER = ['OCAK','ŞUBAT','MART','NİSAN','MAYIS','HAZİRAN','TEMMUZ'];

const CATEGORY_META = {
  hisse:   { label: 'Hisse Senetleri', color: '#3ecf8e', short: 'Hisse' },
  fon:     { label: 'Yatırım Fonları', color: '#5b8fd9', short: 'Fon' },
  altin:   { label: 'Fiziki Altın',    color: '#e8b84b', short: 'Altın' },
  bitcoin: { label: 'Bitcoin',         color: '#e8a856', short: 'BTC' },
  voo:     { label: 'VOO (S&P 500)',   color: '#c07de0', short: 'VOO' },
};

const SECTOR_PALETTE = ['#3ecf8e','#5b8fd9','#e8b84b','#e8a856','#c07de0','#5de0c4','#e87d9a','#8fd95b','#7d9ae8','#d9c45b','#e85b7d','#5bd9a8'];
function colorForIndex(i) { return SECTOR_PALETTE[i % SECTOR_PALETTE.length]; }

function fmtTRY(n, opts = {}) {
  if (n === null || n === undefined || Number.isNaN(n)) return '—';
  const { decimals = 0, sign = false } = opts;
  const s = n.toLocaleString('tr-TR', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  const prefix = sign && n > 0 ? '+' : '';
  return prefix + '₺' + s;
}
function fmtPct(n, opts = {}) {
  if (n === null || n === undefined || Number.isNaN(n)) return '—';
  const { decimals = 1, sign = false } = opts;
  const s = (n * 100).toLocaleString('tr-TR', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  const prefix = sign && n > 0 ? '+' : '';
  return prefix + s + '%';
}
function fmtNum(n, decimals = 0) {
  if (n === null || n === undefined || Number.isNaN(n)) return '—';
  return n.toLocaleString('tr-TR', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}
// Splits the TRY-value change of a foreign-currency-priced asset (VOO in USD, or BTC via its TRY price)
// into "asset price movement" vs "USD/TRY exchange rate movement", holding quantity fixed at current qty
// (i.e. isolates the pure price/fx effect, separate from money added/removed which is handled by computeCashFlow).
function computeFxSplit({ curPriceForeign, curFx, prevPriceForeign, prevFx, qty }) {
  if ([curPriceForeign, curFx, prevPriceForeign, prevFx, qty].some(v => typeof v !== 'number' || Number.isNaN(v))) {
    return null;
  }
  const curValueTry = curPriceForeign * curFx * qty;
  const valueAtPrevFxTry = curPriceForeign * prevFx * qty; // what it would be worth if FX hadn't moved
  const prevValueTry = prevPriceForeign * prevFx * qty;
  const assetMove = valueAtPrevFxTry - prevValueTry; // pure asset price effect, at constant FX
  const fxMove = curValueTry - valueAtPrevFxTry;     // pure FX effect, at constant asset price (current)
  return { assetMove, fxMove, total: assetMove + fxMove };
}

// Approximate split of month-over-month change into "new money/units added" vs "market price movement".
// For stocks/funds/crypto/ETF: qty change x current price/value-per-unit = new money; remainder = market move.
// Gold has had a constant quantity across all recorded months, so its entire change is market move.
function computeCashFlow(month, prevMonth) {
  let newMoney = 0;
  let marketMove = 0;

  const sumPositions = (curList, prevList, keyField, valueField) => {
    const prevMap = Object.fromEntries(prevList.map(p => [p[keyField], p]));
    const curMap = Object.fromEntries(curList.map(p => [p[keyField], p]));
    const allKeys = new Set([...curList.map(p=>p[keyField]), ...prevList.map(p=>p[keyField])]);
    allKeys.forEach(k => {
      const cur = curMap[k];
      const prev = prevMap[k];
      const curVal = cur ? cur[valueField] : 0;
      const prevVal = prev ? prev[valueField] : 0;
      const totalDiff = (curVal || 0) - (prevVal || 0);
      if (cur && prev) {
        const qtyDiff = cur.qty - prev.qty;
        const unitPrice = cur.qty !== 0 ? curVal / cur.qty : 0;
        const addedByQty = qtyDiff * unitPrice;
        newMoney += addedByQty;
        marketMove += totalDiff - addedByQty;
      } else if (cur && !prev) {
        // brand new position — treat full value as new money
        newMoney += curVal;
      } else if (!cur && prev) {
        // fully exited position — treat full removal as withdrawn money (negative new money)
        newMoney -= prevVal;
      }
    });
  };

  sumPositions(month.stocks, prevMonth.stocks, 'code', 'market_value_try');
  sumPositions(month.funds, prevMonth.funds, 'code', 'market_value_try');

  // Crypto/ETF: use qty where available
  const curCrypto = month.crypto_etf.filter(c => c.qty !== null && typeof c.total_value_try === 'number');
  const prevCrypto = prevMonth.crypto_etf.filter(c => c.qty !== null && typeof c.total_value_try === 'number');
  sumPositions(curCrypto.map(c => ({ code: c.asset, qty: c.qty, market_value_try: c.total_value_try })),
               prevCrypto.map(c => ({ code: c.asset, qty: c.qty, market_value_try: c.total_value_try })),
               'code', 'market_value_try');

  // Gold: quantity has stayed constant across the whole record — entire change is market move.
  if (month.gold_total && prevMonth.gold_total) {
    marketMove += month.gold_total.current_value_try - prevMonth.gold_total.current_value_try;
  }

  const total = newMoney + marketMove;
  return { newMoney, marketMove, total };
}

export default function PortfolioDashboard() {
  const [monthIdx, setMonthIdx] = useState(MONTH_ORDER.length - 1);
  const [tab, setTab] = useState('genel');

  const monthKey = MONTH_ORDER[monthIdx];
  const month = RAW_DATA[monthKey];
  const prevKey = monthIdx > 0 ? MONTH_ORDER[monthIdx - 1] : null;
  const prevMonth = prevKey ? RAW_DATA[prevKey] : null;
  const firstMonth = RAW_DATA[MONTH_ORDER[0]];

  const totalChange = prevMonth ? month.total_try - prevMonth.total_try : null;
  const totalChangePct = prevMonth ? (month.total_try / prevMonth.total_try - 1) : null;
  const totalChangeSinceStart = month.total_try - firstMonth.total_try;
  const totalChangeSinceStartPct = (month.total_try / firstMonth.total_try - 1);

  // Cumulative cash flow split from the first recorded month up to the selected month:
  // sum the newMoney/marketMove of each consecutive month-pair, so buys/sells that happen
  // and reverse in between are captured correctly (not just a single first-vs-last comparison).
  const cumulativeFlow = useMemo(() => {
    let newMoney = 0, marketMove = 0;
    for (let i = 1; i <= monthIdx; i++) {
      const flow = computeCashFlow(RAW_DATA[MONTH_ORDER[i]], RAW_DATA[MONTH_ORDER[i - 1]]);
      newMoney += flow.newMoney;
      marketMove += flow.marketMove;
    }
    return { newMoney, marketMove, total: newMoney + marketMove };
  }, [monthIdx]);
  const marketReturnPct = firstMonth.total_try ? cumulativeFlow.marketMove / firstMonth.total_try : null;

  const historySeries = useMemo(() => {
    return MONTH_ORDER.map((k) => ({ key: k, name: RAW_DATA[k].display_name, total: RAW_DATA[k].total_try }));
  }, []);

  const maxTotal = Math.max(...historySeries.map(h => h.total));
  const minTotal = Math.min(...historySeries.map(h => h.total));

  const categoryRows = month.summary.map(s => {
    const prevRow = prevMonth ? prevMonth.summary.find(p => p.key === s.key) : null;
    const diff = prevRow ? s.value_try - prevRow.value_try : null;
    return { ...s, diff, prevValue: prevRow ? prevRow.value_try : null };
  });

  return (
    <div style={styles.page}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,500;9..144,600;9..144,700&family=IBM+Plex+Mono:wght@400;500;600&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; }
        ::selection { background: #3ecf8e55; }
        .fade-in { animation: fadeIn 0.45s ease both; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
        .row-hover:hover { background: rgba(255,255,255,0.035) !important; }
        .tab-btn { transition: color 0.2s ease, border-color 0.2s ease; }
        .month-btn { transition: all 0.2s ease; }
        .bar-fill { transition: width 0.6s cubic-bezier(0.16, 1, 0.3, 1); }
        .scrollbar-thin::-webkit-scrollbar { height: 6px; width: 6px; }
        .scrollbar-thin::-webkit-scrollbar-thumb { background: #3a3530; border-radius: 4px; }
        .scrollbar-thin::-webkit-scrollbar-track { background: transparent; }
      `}</style>

      <div style={styles.bgTexture} />

      <header style={styles.header}>
        <div style={styles.headerInner}>
          <div>
            <div style={styles.kicker}>PORTFÖY DEFTERİ</div>
            <h1 style={styles.title}>Sefer'in Varlık Raporu</h1>
          </div>
          <div style={styles.headerTotal}>
            <div style={styles.headerTotalLabel}>Güncel Toplam Değer</div>
            <div style={styles.headerTotalValue}>{fmtTRY(month.total_try)}</div>
            {prevMonth && (
              <div style={{ ...styles.headerTotalChange, color: totalChange >= 0 ? '#3ecf8e' : '#e8687a' }}>
                {totalChange >= 0 ? '▲' : '▼'} {fmtTRY(Math.abs(totalChange))} ({fmtPct(Math.abs(totalChangePct))}) geçen aya göre
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Month selector */}
      <div style={styles.monthBar}>
        <div style={styles.monthBarInner}>
          {MONTH_ORDER.map((k, i) => {
            const active = i === monthIdx;
            return (
              <button
                key={k}
                className="month-btn"
                onClick={() => setMonthIdx(i)}
                style={{
                  ...styles.monthBtn,
                  ...(active ? styles.monthBtnActive : {}),
                }}
              >
                <span style={{ fontSize: 13, letterSpacing: '0.03em' }}>{RAW_DATA[k].display_name}</span>
                <span style={{ fontSize: 10, opacity: 0.55, display: 'block', marginTop: 2 }}>{RAW_DATA[k].report_date}</span>
              </button>
            );
          })}
        </div>
      </div>

      <main style={styles.main}>
        {/* Tabs */}
        <div style={styles.tabs}>
          {[
            { id: 'genel', label: 'Genel Bakış' },
            { id: 'hisse', label: 'Hisseler' },
            { id: 'fon', label: 'Fonlar' },
            { id: 'altin', label: 'Altın' },
            { id: 'btc', label: 'Bitcoin' },
            { id: 'etf', label: 'ETF (VOO/QQQ)' },
          ].map(t => (
            <button
              key={t.id}
              className="tab-btn"
              onClick={() => setTab(t.id)}
              style={{
                ...styles.tabBtn,
                color: tab === t.id ? '#eef2f5' : '#6d7885',
                borderBottom: tab === t.id ? '2px solid #3ecf8e' : '2px solid transparent',
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'genel' && (
          <div className="fade-in">
            {/* Summary stat cards */}
            <div style={styles.statGrid}>
              <StatCard
                label="Toplam Bakiye Değişimi"
                value={fmtTRY(totalChangeSinceStart, { sign: true })}
                sub={fmtPct(totalChangeSinceStartPct, { sign: true }) + ' · ' + firstMonth.display_name + '\'tan beri, yeni yatırımlar dahil'}
                positive={totalChangeSinceStart >= 0}
              />
              <StatCard
                label="Gerçek Piyasa Getirisi"
                value={monthIdx > 0 ? fmtTRY(cumulativeFlow.marketMove, { sign: true }) : '—'}
                sub={monthIdx > 0 ? fmtPct(marketReturnPct, { sign: true }) + ' · yeni para hariç, sadece fiyat hareketi' : 'İlk kayıtlı ay'}
                positive={monthIdx > 0 ? cumulativeFlow.marketMove >= 0 : undefined}
              />
              <StatCard
                label="Aylık değişim"
                value={prevMonth ? fmtTRY(totalChange, { sign: true }) : '—'}
                sub={prevMonth ? fmtPct(totalChangePct, { sign: true }) + ' · ' + prevMonth.display_name + '\'a göre' : 'İlk kayıtlı ay'}
                positive={totalChange >= 0}
              />
              <StatCard
                label="USD/TRY kuru"
                value={month.usd_try_rate ? '₺' + month.usd_try_rate : '—'}
                sub={month.report_date + ' kapanışı'}
              />
            </div>
            {monthIdx > 0 && (
              <div style={{ fontSize: 11.5, color: '#576270', marginTop: -12, marginBottom: 20 }}>
                "Toplam Bakiye Değişimi" senin eklediğin yeni parayı da içerir; "Gerçek Piyasa Getirisi" sadece {firstMonth.display_name}'tan beri elindeki varlıkların fiyat hareketini gösterir — bu ay içine yeni eklenen adetler hariçtir.
              </div>
            )}

            {/* Total value history chart */}
            <Panel title="Toplam Portföy Değeri — Aylık Seyir">
              <HistoryChart series={historySeries} activeIdx={monthIdx} min={minTotal} max={maxTotal} />
            </Panel>

            <Panel title={month.display_name + ' — Varlık Dağılımı'}>
              <PieChart
                data={[...categoryRows].sort((a,b)=>b.value_try-a.value_try).map(row => ({
                  label: (CATEGORY_META[row.key] || { label: row.clean_name }).label,
                  value: row.value_try,
                  color: (CATEGORY_META[row.key] || { color: '#999' }).color,
                }))}
                centerLabel={fmtTRY(month.total_try)}
              />
            </Panel>

            {prevMonth && (() => {
                const flow = computeCashFlow(month, prevMonth);
                const barTotal = Math.abs(flow.newMoney) + Math.abs(flow.marketMove) || 1;
                return (
                  <Panel title={prevMonth.display_name + ' → ' + month.display_name + ' — Nakit Akışı'}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                        <span style={{ fontSize: 13, color: '#a9b4c0' }}>Toplam değişim</span>
                        <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 15, fontWeight: 600, color: flow.total >= 0 ? '#3ecf8e' : '#e8687a' }}>
                          {fmtTRY(flow.total, {sign:true})}
                        </span>
                      </div>
                      <div style={styles.barTrack}>
                        <div style={{ display: 'flex', height: '100%' }}>
                          <div style={{ width: Math.abs(flow.newMoney) / barTotal * 100 + '%', background: '#5b8fd9' }} />
                          <div style={{ width: Math.abs(flow.marketMove) / barTotal * 100 + '%', background: '#e8b84b' }} />
                        </div>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, flexWrap: 'wrap' }}>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <span style={{ width: 8, height: 8, borderRadius: 999, background: '#5b8fd9' }} />
                            <span style={{ fontSize: 12, color: '#a9b4c0' }}>Net Alım/Satım</span>
                          </div>
                          <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 14, color: '#d7dee5', marginTop: 3 }}>{fmtTRY(flow.newMoney, {sign:true})}</div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'flex-end' }}>
                            <span style={{ fontSize: 12, color: '#a9b4c0' }}>Piyasa Hareketi</span>
                            <span style={{ width: 8, height: 8, borderRadius: 999, background: '#e8b84b' }} />
                          </div>
                          <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 14, color: '#d7dee5', marginTop: 3 }}>{fmtTRY(flow.marketMove, {sign:true})}</div>
                        </div>
                      </div>
                      <div style={{ fontSize: 11, color: '#576270', marginTop: 4 }}>
                        Adet/miktar artışı net alım, azalışı net satım olarak sayılır (parayı nereye koyduğunuza bakılmaksızın); geri kalanı fiyat hareketinden gelir.
                      </div>
                    </div>
                  </Panel>
                );
            })()}

            <div style={styles.twoCol}>
              {/* Category breakdown */}
              <Panel title={month.display_name + ' — Kategori Dağılımı'}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {[...categoryRows].sort((a,b)=>b.value_try-a.value_try).map(row => {
                    const meta = CATEGORY_META[row.key] || { label: row.clean_name, color: '#999' };
                    return (
                      <div key={row.key}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 5 }}>
                          <span style={{ fontSize: 13.5, color: '#d7dee5', fontWeight: 500 }}>{meta.label}</span>
                          <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 13, color: '#a9b4c0' }}>
                            {fmtTRY(row.value_try)} <span style={{ color: '#6d7885', fontSize: 11.5 }}>({fmtPct(row.pct)})</span>
                          </span>
                        </div>
                        <div style={styles.barTrack}>
                          <div className="bar-fill" style={{ ...styles.barFillBase, width: (row.pct*100) + '%', background: meta.color }} />
                        </div>
                        {row.diff !== null && (
                          <div style={{ fontSize: 11, marginTop: 3, color: row.diff >= 0 ? '#3ecf8e' : '#e8687a' }}>
                            {row.diff >= 0 ? '▲' : '▼'} {fmtTRY(Math.abs(row.diff))} geçen aya göre
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </Panel>

              {/* Month notes / meta */}
              <Panel title={month.display_name + ' — Notlar'}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {month.summary.map(s => {
                    const meta = CATEGORY_META[s.key] || { label: s.clean_name, color: '#999' };
                    return (
                      <div key={s.key} style={styles.noteRow}>
                        <span style={{ width: 8, height: 8, borderRadius: 999, background: meta.color, flexShrink: 0 }} />
                        <span style={{ color: '#a9b4c0', fontSize: 13, flexShrink: 0, minWidth: 92 }}>{meta.label}</span>
                        <span style={{ color: '#6d7885', fontSize: 12.5 }}>{s.comment}</span>
                      </div>
                    );
                  })}
                  {prevMonth && (() => {
                    const mostGrown = [...categoryRows].filter(r => r.diff !== null).sort((a,b) => b.diff - a.diff)[0];
                    if (!mostGrown || mostGrown.diff <= 0) return null;
                    const meta = CATEGORY_META[mostGrown.key] || { label: mostGrown.clean_name };
                    return (
                      <div style={{ marginTop: 6, paddingTop: 12, borderTop: '1px solid #2a3542' }}>
                        <div style={{ fontSize: 11.5, color: '#6d7885', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>En Çok Artan Varlık</div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', fontFamily: 'IBM Plex Mono, monospace', fontSize: 13 }}>
                          <span style={{ color: '#d7dee5', fontWeight: 600 }}>{meta.label}</span>
                          <span style={{ color: '#3ecf8e' }}>+{fmtTRY(mostGrown.diff)}</span>
                        </div>
                      </div>
                    );
                  })()}
                  {month.gold_total && (
                    <div style={{ marginTop: 6, paddingTop: 12, borderTop: '1px solid #2a3542' }}>
                      <div style={{ fontSize: 11.5, color: '#6d7885', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Altın Kâr/Zarar</div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'IBM Plex Mono, monospace', fontSize: 13 }}>
                        <span style={{ color: '#6d7885' }}>Maliyet: {fmtTRY(month.gold_total.cost_try)}</span>
                        <span style={{ color: '#3ecf8e' }}>K/Z: {fmtTRY(month.gold_total.profit_try, {sign:true})} ({fmtPct(month.gold_total.profit_pct, {sign:true})})</span>
                      </div>
                    </div>
                  )}
                </div>
              </Panel>
            </div>
          </div>
        )}

        {tab === 'hisse' && (
          <div className="fade-in">
            <Panel title={month.display_name + ' — Sektör Dağılımı'}>
              {(() => {
                const sectorTotals = {};
                month.stocks.forEach(s => {
                  sectorTotals[s.sector] = (sectorTotals[s.sector] || 0) + s.market_value_try;
                });
                const sectorEntries = Object.entries(sectorTotals).sort((a,b) => b[1]-a[1]);
                return (
                  <PieChart
                    data={sectorEntries.map(([sector, value], i) => ({ label: sector, value, color: colorForIndex(i) }))}
                  />
                );
              })()}
            </Panel>
            <Panel title={month.display_name + ' — Hisse Bazında Dağılım'}>
              <PieChart
                data={[...month.stocks].sort((a,b)=>b.market_value_try-a.market_value_try).map((s, i) => ({
                  label: s.code, value: s.market_value_try, color: colorForIndex(i),
                }))}
              />
            </Panel>
            <Panel title={month.display_name + ' — Hisse Senedi Pozisyonları (' + month.stocks.length + ' pozisyon)'} noPad>
              <PositionTable
                columns={['KOD', 'ADI', 'ADET', 'FİYAT', 'DEĞER', 'K/Z', 'PAY', 'SEKTÖR']}
                rows={[...month.stocks].sort((a,b)=>b.market_value_try-a.market_value_try).map(s => [
                  <span style={{ fontWeight: 600, color: '#5de0a8' }}>{s.code}</span>,
                  s.name,
                  fmtNum(s.qty),
                  fmtTRY(s.price, {decimals:2}),
                  fmtTRY(s.market_value_try),
                  typeof s.pnl === 'number' ? <span style={{ color: s.pnl >= 0 ? '#3ecf8e' : '#e8687a' }}>{fmtTRY(s.pnl, {sign:true})}</span> : '—',
                  fmtPct(s.pct),
                  <span style={{ color: '#6d7885' }}>{s.sector}</span>,
                ])}
                prevRows={prevMonth ? prevMonth.stocks : null}
                keyField={month.stocks.map(s=>s.code)}
              />
            </Panel>
            {prevMonth && <StockDiffPanel current={month.stocks} previous={prevMonth.stocks} currentName={month.display_name} previousName={prevMonth.display_name} />}
          </div>
        )}

        {tab === 'fon' && (
          <div className="fade-in">
            <Panel title={month.display_name + ' — Yatırım Fonu Pozisyonları (' + month.funds.length + ' fon)'} noPad>
              <PositionTable
                columns={['KOD', 'ADI', 'ADET', 'BİRİM FİYAT', 'DEĞER', 'PAY', 'PLATFORM']}
                rows={[...month.funds].sort((a,b)=>b.market_value_try-a.market_value_try).map(f => [
                  <span style={{ fontWeight: 600, color: '#7aa8c9' }}>{f.code}</span>,
                  f.name,
                  fmtNum(f.qty),
                  fmtNum(f.unit_price, 4),
                  fmtTRY(f.market_value_try),
                  fmtPct(f.pct),
                  <span style={{ color: '#6d7885' }}>{f.platform}</span>,
                ])}
              />
            </Panel>
          </div>
        )}

        {tab === 'altin' && (
          <div className="fade-in">
            <Panel title={month.display_name + ' — Fiziki Altın Pozisyonları'} noPad>
              <div style={{ overflowX: 'auto' }} className="scrollbar-thin">
              <table style={styles.miniTable}>
                <thead>
                  <tr>
                    <th style={styles.th}>Tür</th>
                    <th style={styles.th}>Adet</th>
                    <th style={styles.th}>Gram</th>
                    <th style={styles.th}>Maliyet</th>
                    <th style={styles.th}>Güncel Değer</th>
                    <th style={styles.th}>K/Z</th>
                  </tr>
                </thead>
                <tbody>
                  {month.gold.map((g, i) => (
                    <tr key={i} className="row-hover">
                      <td style={styles.td}>{g.type}</td>
                      <td style={styles.td}>{fmtNum(g.qty)}</td>
                      <td style={styles.td}>{fmtNum(g.total_gram, 2)}</td>
                      <td style={styles.td}>{fmtTRY(g.cost_try)}</td>
                      <td style={styles.td}>{fmtTRY(g.current_value_try)}</td>
                      <td style={{ ...styles.td, color: g.profit_try >= 0 ? '#7fc9b4' : '#e8879a' }}>
                        {fmtTRY(g.profit_try, {sign:true})} ({fmtPct(g.profit_pct, {sign:true})})
                      </td>
                    </tr>
                  ))}
                  {month.gold_total && (
                    <tr style={{ borderTop: '1px solid #3a4756' }}>
                      <td style={{ ...styles.td, fontWeight: 600, color: '#f0c869' }}>TOPLAM</td>
                      <td style={styles.td}>{fmtNum(month.gold_total.qty)}</td>
                      <td style={styles.td}>{fmtNum(month.gold_total.total_gram, 2)}</td>
                      <td style={styles.td}>{fmtTRY(month.gold_total.cost_try)}</td>
                      <td style={{ ...styles.td, fontWeight: 600 }}>{fmtTRY(month.gold_total.current_value_try)}</td>
                      <td style={{ ...styles.td, fontWeight: 600, color: month.gold_total.profit_try >= 0 ? '#7fc9b4' : '#e8879a' }}>
                        {fmtTRY(month.gold_total.profit_try, {sign:true})} ({fmtPct(month.gold_total.profit_pct, {sign:true})})
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              </div>
            </Panel>
            {month.gold_total && (
              <div style={styles.statGrid}>
                <StatCard label="Toplam Gram" value={fmtNum(month.gold_total.total_gram, 2) + ' gr'} sub={fmtNum(month.gold_total.qty) + ' adet parça'} />
                <StatCard label="Toplam Maliyet" value={fmtTRY(month.gold_total.cost_try)} sub="Alım maliyeti" />
                <StatCard label="Güncel Değer" value={fmtTRY(month.gold_total.current_value_try)} sub={month.report_date + ' itibarıyla'} />
                <StatCard label="Kâr/Zarar" value={fmtTRY(month.gold_total.profit_try, {sign:true})} sub={fmtPct(month.gold_total.profit_pct, {sign:true})} positive={month.gold_total.profit_try >= 0} />
              </div>
            )}
            {prevMonth && month.gold_total && prevMonth.gold_total && (() => {
              const curFx = parseFloat(String(month.usd_try_rate).replace(',', '.'));
              const prevFx = parseFloat(String(prevMonth.usd_try_rate).replace(',', '.'));
              const gram = month.gold_total.total_gram;
              const prevGram = prevMonth.gold_total.total_gram;
              if (gram !== prevGram) {
                return (
                  <Panel title="Kur Etkisi Ayrıştırması">
                    <div style={{ color: '#576270', fontSize: 12.5 }}>Bu ay içinde gram miktarı değiştiği için kur ayrıştırması hesaplanamadı (yeni alım ile piyasa hareketi karışıyor).</div>
                  </Panel>
                );
              }
              const curPriceUsdPerGram = (month.gold_total.current_value_try / gram) / curFx;
              const prevPriceUsdPerGram = (prevMonth.gold_total.current_value_try / prevGram) / prevFx;
              const split = computeFxSplit({ curPriceForeign: curPriceUsdPerGram, curFx, prevPriceForeign: prevPriceUsdPerGram, prevFx, qty: gram });
              if (!split) return null;
              return (
                <Panel title="Altın — Kur Etkisi Ayrıştırması">
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: 13, color: '#a9b4c0' }}>Ons/gram altın fiyat hareketi (USD bazında)</span>
                      <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 13.5, color: split.assetMove >= 0 ? '#3ecf8e' : '#e8687a' }}>{fmtTRY(split.assetMove, {sign:true})}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: 13, color: '#a9b4c0' }}>USD/TRY kur etkisi</span>
                      <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 13.5, color: split.fxMove >= 0 ? '#3ecf8e' : '#e8687a' }}>{fmtTRY(split.fxMove, {sign:true})}</span>
                    </div>
                    <div style={{ fontSize: 11, color: '#576270', marginTop: 2 }}>
                      {fmtNum(prevFx,2)} → {fmtNum(curFx,2)} kur değişimiyle, {fmtNum(gram,2)} gr sabit tutularak hesaplanmıştır. Altın USD/ons bazlı fiyatlandığı için TL değerindeki değişim de bu iki etkiye ayrıştırılabilir.
                    </div>
                  </div>
                </Panel>
              );
            })()}
          </div>
        )}

        {tab === 'btc' && (
          <div className="fade-in">
            {(() => {
              const btc = month.crypto_etf.find(c => c.asset === 'Bitcoin');
              const btcSummary = month.summary.find(s => s.key === 'bitcoin');
              const prevBtc = prevMonth ? prevMonth.crypto_etf.find(c => c.asset === 'Bitcoin') : null;
              const valDiff = prevBtc && btc ? btc.total_value_try - prevBtc.total_value_try : null;
              return (
                <>
                  <div style={styles.statGrid}>
                    <StatCard label="Değer (TL)" value={btc ? fmtTRY(btc.total_value_try) : '—'} sub={btcSummary ? fmtPct(btcSummary.pct) + ' portföy payı' : ''} />
                    <StatCard label="Miktar" value={btc && btc.qty !== null ? fmtNum(btc.qty, 6) + ' BTC' : '—'} sub={btcSummary ? btcSummary.comment : ''} />
                    <StatCard label="Kâr/Zarar %" value={btc && typeof btc.profit_pct === 'number' ? fmtPct(btc.profit_pct, {sign:true}) : '—'} positive={btc && typeof btc.profit_pct === 'number' ? btc.profit_pct >= 0 : undefined} sub="Maliyete göre" />
                    <StatCard label="Aylık Değişim" value={valDiff !== null ? fmtTRY(valDiff, {sign:true}) : '—'} sub={prevMonth ? (prevMonth.display_name + '\'a göre') : 'İlk kayıt'} positive={valDiff !== null ? valDiff >= 0 : undefined} />
                  </div>
                  <Panel title="Bitcoin — Aylık Seyir">
                    <MiniAssetChart series={MONTH_ORDER.map(k => {
                      const c = RAW_DATA[k].crypto_etf.find(x => x.asset === 'Bitcoin');
                      return { name: RAW_DATA[k].display_name, value: c ? c.total_value_try : null };
                    })} color="#e8a856" activeIdx={monthIdx} />
                  </Panel>
                  {prevMonth && (() => {
                    const prevBtcC = prevMonth.crypto_etf.find(c => c.asset === 'Bitcoin');
                    const curFx = parseFloat(String(month.usd_try_rate).replace(',', '.'));
                    const prevFx = parseFloat(String(prevMonth.usd_try_rate).replace(',', '.'));
                    const curPriceTry = typeof btc?.current_price === 'number' ? btc.current_price : null;
                    const prevPriceTry = typeof prevBtcC?.current_price === 'number' ? prevBtcC.current_price : null;
                    if (curPriceTry === null || prevPriceTry === null) {
                      return (
                        <Panel title="Kur Etkisi Ayrıştırması">
                          <div style={{ color: '#576270', fontSize: 12.5 }}>Bu ay için fiyat verisi metin formatında geldiğinden kur ayrıştırması hesaplanamadı.</div>
                        </Panel>
                      );
                    }
                    const curPriceUsd = curPriceTry / curFx;
                    const prevPriceUsd = prevPriceTry / prevFx;
                    const split = computeFxSplit({ curPriceForeign: curPriceUsd, curFx, prevPriceForeign: prevPriceUsd, prevFx, qty: btc.qty });
                    if (!split) return null;
                    return (
                      <Panel title="Kur Etkisi Ayrıştırması">
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ fontSize: 13, color: '#a9b4c0' }}>BTC fiyat hareketi (USD bazında)</span>
                            <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 13.5, color: split.assetMove >= 0 ? '#3ecf8e' : '#e8687a' }}>{fmtTRY(split.assetMove, {sign:true})}</span>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ fontSize: 13, color: '#a9b4c0' }}>USD/TRY kur etkisi</span>
                            <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 13.5, color: split.fxMove >= 0 ? '#3ecf8e' : '#e8687a' }}>{fmtTRY(split.fxMove, {sign:true})}</span>
                          </div>
                          <div style={{ fontSize: 11, color: '#576270', marginTop: 2 }}>
                            {fmtNum(prevFx,2)} → {fmtNum(curFx,2)} kur değişimiyle, miktar sabit tutularak hesaplanmıştır.
                          </div>
                        </div>
                      </Panel>
                    );
                  })()}
                  {btc && (
                    <Panel title="Detaylar">
                      <div style={{ overflowX: 'auto' }} className="scrollbar-thin">
                      <table style={styles.miniTable}>
                        <tbody>
                          <tr><td style={{...styles.td, color:'#8a94a0'}}>Ortalama Maliyet</td><td style={styles.td}>{typeof btc.avg_cost === 'string' ? btc.avg_cost : fmtNum(btc.avg_cost)}</td></tr>
                          <tr><td style={{...styles.td, color:'#8a94a0'}}>Güncel Fiyat</td><td style={styles.td}>{typeof btc.current_price === 'string' ? btc.current_price : fmtNum(btc.current_price)}</td></tr>
                          <tr><td style={{...styles.td, color:'#8a94a0'}}>Para Birimi</td><td style={styles.td}>{btc.currency}</td></tr>
                        </tbody>
                      </table>
                      </div>
                    </Panel>
                  )}
                </>
              );
            })()}
          </div>
        )}

        {tab === 'etf' && (
          <div className="fade-in">
            <Panel title={month.display_name + ' — Yabancı ETF Pozisyonları'} noPad>
              <div style={{ overflowX: 'auto' }} className="scrollbar-thin">
              <table style={styles.miniTable}>
                <thead>
                  <tr>
                    <th style={styles.th}>Varlık</th>
                    <th style={styles.th}>Tür</th>
                    <th style={styles.th}>Adet</th>
                    <th style={styles.th}>Ort. Maliyet</th>
                    <th style={styles.th}>Güncel Fiyat</th>
                    <th style={styles.th}>Değer (TL)</th>
                    <th style={styles.th}>K/Z %</th>
                  </tr>
                </thead>
                <tbody>
                  {month.crypto_etf.filter(c => c.asset !== 'Bitcoin').map((c, i) => (
                    <tr key={i} className="row-hover">
                      <td style={{ ...styles.td, fontWeight: 600, color: '#7dc4d9' }}>{c.asset}</td>
                      <td style={{ ...styles.td, color: '#8a94a0' }}>{c.type}</td>
                      <td style={styles.td}>{c.qty !== null ? fmtNum(c.qty, 4) : '—'}</td>
                      <td style={styles.td}>{typeof c.avg_cost === 'string' ? c.avg_cost : (c.avg_cost !== null ? fmtNum(c.avg_cost, 2) : '—')}</td>
                      <td style={styles.td}>{typeof c.current_price === 'number' ? (c.currency === 'USD' ? '$' : '₺') + fmtNum(c.current_price, 2) : c.current_price}</td>
                      <td style={styles.td}>{c.total_value_try !== null && typeof c.total_value_try === 'number' ? fmtTRY(c.total_value_try) : '—'}</td>
                      <td style={{ ...styles.td, color: (typeof c.profit_pct === 'number' && c.profit_pct >= 0) ? '#7fc9b4' : (typeof c.profit_pct === 'number' ? '#e8879a' : '#8a94a0') }}>
                        {typeof c.profit_pct === 'number' ? fmtPct(c.profit_pct, {sign:true}) : '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
            </Panel>
            {month.usd_try_rate && (
              <div style={{ fontSize: 11.5, color: '#6f7680', fontFamily: 'IBM Plex Mono, monospace', padding: '4px 4px' }}>
                USD/TRY ≈ ₺{month.usd_try_rate} ({month.report_date} kapanışı)
              </div>
            )}
            {prevMonth && (() => {
              const voo = month.crypto_etf.find(c => c.asset === 'VOO');
              const prevVoo = prevMonth.crypto_etf.find(c => c.asset === 'VOO');
              const curFx = parseFloat(String(month.usd_try_rate).replace(',', '.'));
              const prevFx = parseFloat(String(prevMonth.usd_try_rate).replace(',', '.'));
              if (!voo || !prevVoo || typeof voo.current_price !== 'number' || typeof prevVoo.current_price !== 'number') return null;
              const split = computeFxSplit({ curPriceForeign: voo.current_price, curFx, prevPriceForeign: prevVoo.current_price, prevFx, qty: voo.qty });
              if (!split) return null;
              return (
                <Panel title="VOO — Kur Etkisi Ayrıştırması">
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: 13, color: '#a9b4c0' }}>VOO fiyat hareketi (USD bazında)</span>
                      <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 13.5, color: split.assetMove >= 0 ? '#3ecf8e' : '#e8687a' }}>{fmtTRY(split.assetMove, {sign:true})}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: 13, color: '#a9b4c0' }}>USD/TRY kur etkisi</span>
                      <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 13.5, color: split.fxMove >= 0 ? '#3ecf8e' : '#e8687a' }}>{fmtTRY(split.fxMove, {sign:true})}</span>
                    </div>
                    <div style={{ fontSize: 11, color: '#576270', marginTop: 2 }}>
                      {fmtNum(prevFx,2)} → {fmtNum(curFx,2)} kur değişimiyle, miktar sabit tutularak hesaplanmıştır.
                    </div>
                  </div>
                </Panel>
              );
            })()}
          </div>
        )}
      </main>

      <footer style={styles.footer}>
        <span>{MONTH_ORDER.length} aylık kayıt · {firstMonth.display_name}-{month.display_name} 2026</span>
      </footer>
    </div>
  );
}

function StatCard({ label, value, sub, positive }) {
  return (
    <div style={styles.statCard}>
      <div style={styles.statLabel}>{label}</div>
      <div style={{ ...styles.statValue, color: positive === undefined ? '#eef2f5' : (positive ? '#3ecf8e' : '#e8687a') }}>{value}</div>
      <div style={styles.statSub}>{sub}</div>
    </div>
  );
}

function Panel({ title, children, noPad }) {
  return (
    <div style={styles.panel}>
      <div style={styles.panelTitle}>{title}</div>
      <div style={{ padding: noPad ? 0 : '18px 20px 20px' }}>{children}</div>
    </div>
  );
}

function HistoryChart({ series, activeIdx, min, max }) {
  const isNarrow = useIsNarrow();
  const w = 900, h = 220, padL = isNarrow ? 10 : 60, padR = isNarrow ? 10 : 20, padT = 28, padB = 36;
  const innerW = w - padL - padR, innerH = h - padT - padB;
  const range = (max - min) || 1;
  const points = series.map((s, i) => {
    const x = padL + (i / (series.length - 1)) * innerW;
    const y = padT + innerH - ((s.total - min) / range) * innerH;
    return { x, y, ...s };
  });
  const pathD = points.map((p, i) => (i === 0 ? 'M' : 'L') + p.x + ',' + p.y).join(' ');
  const areaD = pathD + ' L' + points[points.length-1].x + ',' + (padT+innerH) + ' L' + points[0].x + ',' + (padT+innerH) + ' Z';

  return (
    <div style={{ overflowX: isNarrow ? 'visible' : 'auto' }} className="scrollbar-thin">
      <svg viewBox={'0 0 ' + w + ' ' + h} style={{ width: '100%', minWidth: isNarrow ? 0 : 500, height: 'auto', display: 'block' }}>
        <defs>
          <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3ecf8e" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#3ecf8e" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0,0.25,0.5,0.75,1].map((f,i) => (
          <line key={i} x1={padL} x2={w-padR} y1={padT+innerH*f} y2={padT+innerH*f} stroke="#2a3542" strokeWidth="1" />
        ))}
        <path d={areaD} fill="url(#areaGrad)" />
        <path d={pathD} fill="none" stroke="#3ecf8e" strokeWidth="2.5" />
        {points.map((p, i) => {
          const isFirst = i === 0;
          const isLast = i === points.length - 1;
          const anchor = isFirst ? 'start' : isLast ? 'end' : 'middle';
          const labelX = isFirst ? p.x + 4 : isLast ? p.x - 4 : p.x;
          const nameAnchor = isNarrow ? anchor : 'middle';
          const nameX = isNarrow ? labelX : p.x;
          return (
            <g key={i}>
              <circle cx={p.x} cy={p.y} r={i === activeIdx ? 6 : 4} fill={i === activeIdx ? '#5de0a8' : '#1a1712'} stroke="#3ecf8e" strokeWidth="2" />
              <text x={nameX} y={h-10} textAnchor={nameAnchor} fontSize="12" fill={i === activeIdx ? '#d7dee5' : '#6d7885'} fontFamily="IBM Plex Mono, monospace">{p.name}</text>
              <text x={labelX} y={p.y - 14} textAnchor={anchor} fontSize="11" fill="#a9b4c0" fontFamily="IBM Plex Mono, monospace">
                {(p.total/1000).toLocaleString('tr-TR', {maximumFractionDigits:0})}K
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function MiniAssetChart({ series, color, activeIdx }) {
  const valid = series.filter(s => s.value !== null && s.value !== undefined);
  if (valid.length < 2) {
    return <div style={{ color: '#6d7885', fontSize: 12.5, fontFamily: 'IBM Plex Mono, monospace', padding: '20px 0' }}>Yeterli veri yok.</div>;
  }
  const w = 900, h = 180, padL = 60, padR = 20, padT = 20, padB = 36;
  const innerW = w - padL - padR, innerH = h - padT - padB;
  const values = series.map(s => s.value).filter(v => v !== null && v !== undefined);
  const min = Math.min(...values), max = Math.max(...values);
  const range = (max - min) || 1;
  const points = series.map((s, i) => {
    const x = padL + (i / (series.length - 1)) * innerW;
    const y = s.value !== null && s.value !== undefined ? padT + innerH - ((s.value - min) / range) * innerH : null;
    return { x, y, ...s };
  });
  const validPoints = points.filter(p => p.y !== null);
  const pathD = validPoints.map((p, i) => (i === 0 ? 'M' : 'L') + p.x + ',' + p.y).join(' ');

  return (
    <div style={{ overflowX: 'auto' }} className="scrollbar-thin">
      <svg viewBox={'0 0 ' + w + ' ' + h} style={{ width: '100%', minWidth: 500, height: 'auto', display: 'block' }}>
        {[0,0.5,1].map((f,i) => (
          <line key={i} x1={padL} x2={w-padR} y1={padT+innerH*f} y2={padT+innerH*f} stroke="#2a3542" strokeWidth="1" />
        ))}
        <path d={pathD} fill="none" stroke={color} strokeWidth="2.5" />
        {points.map((p, i) => p.y !== null ? (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r={i === activeIdx ? 6 : 4} fill={i === activeIdx ? color : '#141a23'} stroke={color} strokeWidth="2" />
            <text x={p.x} y={h-10} textAnchor="middle" fontSize="12" fill={i === activeIdx ? '#d7dee5' : '#6d7885'} fontFamily="IBM Plex Mono, monospace">{p.name}</text>
            <text x={p.x} y={p.y - 14} textAnchor="middle" fontSize="11" fill="#a9b4c0" fontFamily="IBM Plex Mono, monospace">
              {(p.value/1000).toLocaleString('tr-TR', {maximumFractionDigits:0})}K
            </text>
          </g>
        ) : null)}
      </svg>
    </div>
  );
}

function PositionTable({ columns, rows }) {
  return (
    <div style={{ overflowX: 'auto' }} className="scrollbar-thin">
      <table style={styles.miniTable}>
        <thead>
          <tr>
            {columns.map((c, i) => <th key={i} style={styles.th}>{c}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="row-hover">
              {r.map((cell, j) => <td key={j} style={styles.td}>{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function StockDiffPanel({ current, previous, currentName, previousName }) {
  const prevMap = Object.fromEntries(previous.map(s => [s.code, s]));
  const curMap = Object.fromEntries(current.map(s => [s.code, s]));
  const allCodes = Array.from(new Set([...current.map(s=>s.code), ...previous.map(s=>s.code)]));

  const changes = allCodes.map(code => {
    const cur = curMap[code];
    const prev = prevMap[code];
    if (cur && prev) {
      const qtyDiff = cur.qty - prev.qty;
      const valDiff = cur.market_value_try - prev.market_value_try;
      return { code, name: cur.name, status: qtyDiff !== 0 ? 'changed' : 'held', qtyDiff, valDiff, curQty: cur.qty, prevQty: prev.qty };
    } else if (cur && !prev) {
      return { code, name: cur.name, status: 'new', qtyDiff: cur.qty, valDiff: cur.market_value_try, curQty: cur.qty, prevQty: 0 };
    } else {
      return { code, name: prev.name, status: 'removed', qtyDiff: -prev.qty, valDiff: -prev.market_value_try, curQty: 0, prevQty: prev.qty };
    }
  }).filter(c => c.status !== 'held');

  if (changes.length === 0) return null;

  return (
    <Panel title={previousName + ' → ' + currentName + ' arası hareketler'} noPad>
      <div style={{ padding: '4px 20px 18px' }}>
        {changes.map((c, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 0', borderBottom: i < changes.length-1 ? '1px solid #232d38' : 'none' }}>
            <span style={{
              fontSize: 10, fontWeight: 600, padding: '2px 7px', borderRadius: 4, letterSpacing: '0.03em',
              background: c.status === 'new' ? '#1c3d33' : c.status === 'removed' ? '#3d2129' : (c.qtyDiff > 0 ? '#1c3d33' : '#3d3220'),
              color: c.status === 'new' ? '#3ecf8e' : c.status === 'removed' ? '#e8687a' : (c.qtyDiff > 0 ? '#3ecf8e' : '#e8b84b'),
            }}>
              {c.status === 'new' ? 'YENİ' : c.status === 'removed' ? 'ÇIKTI' : (c.qtyDiff > 0 ? 'ALIM' : 'SATIM')}
            </span>
            <span style={{ fontWeight: 600, color: '#5de0a8', fontSize: 13, minWidth: 60 }}>{c.code}</span>
            <span style={{ color: '#6d7885', fontSize: 12.5, flex: 1 }}>{c.name}</span>
            <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 12.5, color: '#a9b4c0' }}>
              {c.prevQty} → {c.curQty} adet
            </span>
            <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 12.5, color: c.valDiff >= 0 ? '#3ecf8e' : '#e8687a', minWidth: 110, textAlign: 'right' }}>
              {fmtTRY(c.valDiff, {sign:true})}
            </span>
          </div>
        ))}
      </div>
    </Panel>
  );
}

function useIsNarrow(breakpoint = 520) {
  const [isNarrow, setIsNarrow] = useState(() => typeof window !== 'undefined' ? window.innerWidth < breakpoint : false);
  useEffect(() => {
    const onResize = () => setIsNarrow(window.innerWidth < breakpoint);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [breakpoint]);
  return isNarrow;
}

function PieChart({ data, size = 220, innerRadiusRatio = 0.62, centerLabel, maxLabeled = 10 }) {
  const [expandedOthers, setExpandedOthers] = useState(false);
  const isNarrow = useIsNarrow();
  const sorted = [...data].sort((a, b) => b.value - a.value);
  let displayData = sorted;
  let othersItems = null;
  if (sorted.length > maxLabeled) {
    const head = sorted.slice(0, maxLabeled - 1);
    const tail = sorted.slice(maxLabeled - 1);
    const restValue = tail.reduce((s, d) => s + d.value, 0);
    othersItems = tail;
    displayData = [...head, { label: 'Diğer (' + tail.length + ')', value: restValue, color: '#4a5560', isOthers: true }];
  }

  const total = displayData.reduce((sum, d) => sum + d.value, 0);
  if (total <= 0) return null;

  // Estimate space needed for the longest label text so leader-line labels don't get clipped
  // off the edge of the viewBox on narrow screens (monospace-ish average char width at 11.5px font).
  const longestLabelChars = Math.max(...displayData.map(d => (d.label + ' 100.0%').length));
  const estCharWidth = 6.4;
  const labelTextWidth = longestLabelChars * estCharWidth;
  const pad = isNarrow ? Math.min(labelTextWidth + 20, 150) : 92; // room for outside labels + leader lines
  const vbSize = size + pad * 2;
  const cx = vbSize / 2, cy = vbSize / 2, r = size / 2 - 6, innerR = r * innerRadiusRatio;
  const labelR = r + 22; // where leader lines break outward
  let angle = -90;
  const gapDeg = 1.5;
  const toRad = (deg) => (deg * Math.PI) / 180;

  const slices = displayData.map(d => {
    const fraction = d.value / total;
    const rawSweep = fraction * 360;
    const sweep = Math.max(rawSweep - gapDeg, 0.001);
    const startAngle = angle;
    const endAngle = angle + sweep;
    const midAngle = angle + rawSweep / 2;
    angle += rawSweep;
    const x1 = cx + r * Math.cos(toRad(startAngle));
    const y1 = cy + r * Math.sin(toRad(startAngle));
    const x2 = cx + r * Math.cos(toRad(endAngle));
    const y2 = cy + r * Math.sin(toRad(endAngle));
    const ix1 = cx + innerR * Math.cos(toRad(startAngle));
    const iy1 = cy + innerR * Math.sin(toRad(startAngle));
    const ix2 = cx + innerR * Math.cos(toRad(endAngle));
    const iy2 = cy + innerR * Math.sin(toRad(endAngle));
    const largeArc = sweep > 180 ? 1 : 0;
    const path = [
      'M', x1, y1,
      'A', r, r, 0, largeArc, 1, x2, y2,
      'L', ix2, iy2,
      'A', innerR, innerR, 0, largeArc, 0, ix1, iy1,
      'Z',
    ].join(' ');
    const isRight = Math.cos(toRad(midAngle)) >= 0;
    const elbowX = cx + labelR * Math.cos(toRad(midAngle));
    const elbowY = cy + labelR * Math.sin(toRad(midAngle));
    const endX = cx + (labelR + 16) * Math.cos(toRad(midAngle)) * (isRight ? 1 : 1);
    const labelAnchorX = isRight ? endX + 6 : endX - 6;
    return { ...d, path, fraction, midAngle, isRight, edgeX: cx + r * Math.cos(toRad(midAngle)), edgeY: cy + r * Math.sin(toRad(midAngle)), elbowX, elbowY, labelAnchorX, labelY: elbowY };
  });

  // Spread overlapping labels vertically on each side to avoid collisions
  const spreadSide = (items) => {
    const sortedItems = [...items].sort((a, b) => a.labelY - b.labelY);
    const minGap = 15;
    for (let i = 1; i < sortedItems.length; i++) {
      if (sortedItems[i].labelY - sortedItems[i - 1].labelY < minGap) {
        sortedItems[i].labelY = sortedItems[i - 1].labelY + minGap;
      }
    }
    // clamp within viewBox
    sortedItems.forEach(s => {
      s.labelY = Math.max(14, Math.min(vbSize - 14, s.labelY));
    });
  };
  spreadSide(slices.filter(s => s.isRight));
  spreadSide(slices.filter(s => !s.isRight));

  const onlyLabelAbove = isNarrow ? 0.06 : 0.02; // narrow screens show fewer leader-line labels (only larger slices) to avoid crowding; legend below still lists everything

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18 }}>
      <div style={{ width: '100%', maxWidth: vbSize, margin: '0 auto' }}>
        <svg viewBox={'0 0 ' + vbSize + ' ' + vbSize} style={{ width: '100%', height: 'auto', display: 'block', overflow: 'visible' }}>
          {slices.map((s, i) => (
            <path
              key={i}
              d={s.path}
              fill={s.color}
              style={{ cursor: s.isOthers ? 'pointer' : 'default', opacity: s.isOthers && expandedOthers ? 0.75 : 1 }}
              onClick={() => s.isOthers && setExpandedOthers(v => !v)}
            />
          ))}
          {centerLabel && (
            <>
              <text x={cx} y={cy - 8} textAnchor="middle" fontSize="10.5" fill="#6d7885" fontFamily="IBM Plex Mono, monospace" letterSpacing="0.04em">TOPLAM</text>
              <text x={cx} y={cy + 12} textAnchor="middle" fontSize={size < 200 ? 14 : 16.5} fill="#eef2f5" fontWeight="600" fontFamily="IBM Plex Mono, monospace">{centerLabel}</text>
            </>
          )}
          {slices.filter(s => s.fraction >= onlyLabelAbove).map((s, i) => (
            <g key={'lbl'+i} style={{ cursor: s.isOthers ? 'pointer' : 'default' }} onClick={() => s.isOthers && setExpandedOthers(v => !v)}>
              <polyline
                points={`${s.edgeX},${s.edgeY} ${s.elbowX},${s.elbowY} ${s.labelAnchorX},${s.labelY}`}
                fill="none" stroke="#4a5560" strokeWidth="1"
              />
              <circle cx={s.edgeX} cy={s.edgeY} r="2.5" fill={s.color} />
              <text
                x={s.labelAnchorX + (s.isRight ? 4 : -4)}
                y={s.labelY}
                textAnchor={s.isRight ? 'start' : 'end'}
                dominantBaseline="middle"
                fontSize="11.5"
                fill={s.isOthers ? '#8fd9c4' : '#d7dee5'}
                fontFamily="IBM Plex Mono, monospace"
                textDecoration={s.isOthers ? 'underline' : 'none'}
              >
                {s.label}{s.isOthers ? (expandedOthers ? ' ▲' : ' ▾') : ''} <tspan fill="#7a8592">{fmtPct(s.fraction)}</tspan>
              </text>
            </g>
          ))}
        </svg>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 16px', justifyContent: 'center', maxWidth: 480 }}>
        {slices.map((s, i) => (
          <div
            key={i}
            onClick={() => s.isOthers && setExpandedOthers(v => !v)}
            style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: s.isOthers ? 'pointer' : 'default' }}
          >
            <span style={{ width: 8, height: 8, borderRadius: 999, background: s.color, flexShrink: 0 }} />
            <span style={{ color: s.isOthers ? '#8fd9c4' : '#a9b4c0', fontSize: 11.5, textDecoration: s.isOthers ? 'underline' : 'none' }}>{s.label}</span>
            <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 11, color: '#6d7885' }}>{fmtPct(s.fraction)}</span>
          </div>
        ))}
      </div>
      {expandedOthers && othersItems && (
        <div style={{
          width: '100%', maxWidth: 420, background: '#141a23', border: '1px solid #232d38',
          borderRadius: 10, padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 8,
        }}>
          <div style={{ fontSize: 11, color: '#6d7885', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 2 }}>
            Diğer İçindekiler ({othersItems.length})
          </div>
          {othersItems.map((item, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12.5 }}>
              <span style={{ color: '#d7dee5' }}>{item.label}</span>
              <span style={{ fontFamily: 'IBM Plex Mono, monospace', color: '#a9b4c0' }}>{fmtPct(item.value / total)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    background: '#0d1117',
    color: '#d7dee5',
    fontFamily: '"Fraunces", Georgia, serif',
    position: 'relative',
  },
  bgTexture: {
    position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0,
    backgroundImage: 'radial-gradient(circle at 15% 8%, rgba(62,207,142,0.07), transparent 40%), radial-gradient(circle at 85% 90%, rgba(91,143,217,0.07), transparent 40%)',
  },
  header: {
    position: 'relative', zIndex: 1,
    borderBottom: '1px solid #232d38',
    padding: '28px 24px 24px',
  },
  headerInner: {
    maxWidth: 1100, margin: '0 auto',
    display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16,
  },
  kicker: {
    fontFamily: 'IBM Plex Mono, monospace', fontSize: 11, letterSpacing: '0.18em', color: '#3ecf8e', marginBottom: 6,
  },
  title: {
    fontSize: 30, fontWeight: 600, margin: 0, letterSpacing: '-0.01em', color: '#eef2f5',
  },
  headerTotal: { textAlign: 'right' },
  headerTotalLabel: { fontFamily: 'IBM Plex Mono, monospace', fontSize: 11, color: '#6d7885', letterSpacing: '0.05em' },
  headerTotalValue: { fontSize: 32, fontWeight: 600, color: '#eef2f5', fontFamily: 'IBM Plex Mono, monospace', marginTop: 2 },
  headerTotalChange: { fontSize: 12.5, marginTop: 4, fontFamily: 'IBM Plex Mono, monospace' },

  monthBar: {
    position: 'relative', zIndex: 1,
    borderBottom: '1px solid #232d38', background: '#10151d',
  },
  monthBarInner: {
    maxWidth: 1100, margin: '0 auto', display: 'flex', overflowX: 'auto', WebkitOverflowScrolling: 'touch',
  },
  monthBtn: {
    background: 'none', border: 'none', borderRight: '1px solid #232d38', cursor: 'pointer',
    padding: '14px 22px', color: '#6d7885', fontFamily: '"Fraunces", serif', textAlign: 'left', flexShrink: 0,
  },
  monthBtnActive: {
    color: '#eef2f5', background: 'rgba(62,207,142,0.08)', boxShadow: 'inset 0 -2px 0 #3ecf8e',
  },

  main: { position: 'relative', zIndex: 1, maxWidth: 1100, margin: '0 auto', padding: '28px 24px 60px' },

  tabs: { display: 'flex', gap: 24, marginBottom: 26, borderBottom: '1px solid #232d38', overflowX: 'auto', WebkitOverflowScrolling: 'touch' },
  tabBtn: {
    background: 'none', border: 'none', cursor: 'pointer', padding: '0 0 12px',
    fontFamily: 'IBM Plex Mono, monospace', fontSize: 12.5, letterSpacing: '0.04em', whiteSpace: 'nowrap', flexShrink: 0,
  },

  statGrid: {
    display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14, marginBottom: 24,
  },
  statCard: {
    background: '#141a23', border: '1px solid #232d38', borderRadius: 10, padding: '16px 18px',
  },
  statLabel: { fontFamily: 'IBM Plex Mono, monospace', fontSize: 10.5, color: '#6d7885', letterSpacing: '0.06em', textTransform: 'uppercase' },
  statValue: { fontSize: 21, fontWeight: 600, marginTop: 7, fontFamily: '"Fraunces", serif' },
  statSub: { fontSize: 11.5, color: '#576270', marginTop: 5, fontFamily: 'IBM Plex Mono, monospace' },

  panel: {
    background: '#141a23', border: '1px solid #232d38', borderRadius: 12, marginBottom: 20, overflow: 'hidden',
  },
  panelTitle: {
    padding: '16px 20px', fontFamily: 'IBM Plex Mono, monospace', fontSize: 12, letterSpacing: '0.05em',
    color: '#3ecf8e', borderBottom: '1px solid #232d38', textTransform: 'uppercase',
  },

  twoCol: { display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 20 },

  barTrack: { height: 7, background: '#0a0e14', borderRadius: 4, overflow: 'hidden' },
  barFillBase: { height: '100%', borderRadius: 4 },

  noteRow: { display: 'flex', alignItems: 'baseline', gap: 8, flexWrap: 'wrap' },

  miniTable: { width: '100%', borderCollapse: 'collapse', fontSize: 12.5 },
  th: {
    textAlign: 'left', padding: '10px 14px', fontFamily: 'IBM Plex Mono, monospace', fontSize: 10.5,
    color: '#6d7885', letterSpacing: '0.05em', textTransform: 'uppercase', borderBottom: '1px solid #232d38',
    position: 'sticky', top: 0, background: '#141a23',
  },
  td: {
    padding: '9px 14px', borderBottom: '1px solid #1c2530', fontFamily: 'IBM Plex Mono, monospace', color: '#d7dee5',
    fontSize: 12.5,
  },

  footer: {
    position: 'relative', zIndex: 1, textAlign: 'center', padding: '20px', color: '#4a5560',
    fontFamily: 'IBM Plex Mono, monospace', fontSize: 11, borderTop: '1px solid #232d38',
  },
};
