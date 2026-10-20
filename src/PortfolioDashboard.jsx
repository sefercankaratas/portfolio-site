import React, { useState, useMemo, useEffect } from 'react';

const RAW_DATA = {"OCAK":{"report_date":"31.01.2026","sheet_name":"OCAK","display_name":"Ocak","summary":[{"category":"📈 Hisse Senetleri","value_try":242539.92,"pct":0.23855996049892542,"platform":"Midas","comment":"18 pozisyon, BIST","clean_name":"Hisse Senetleri","key":"hisse"},{"category":"📊 Yatırım Fonları","value_try":342105.8993852848,"pct":0.33649211166476384,"platform":"İş B./Midas","comment":"44 fon","clean_name":"Yatırım Fonları","key":"fon"},{"category":"🥇 Fiziki Altın","value_try":404516.33,"pct":0.39787841814234237,"platform":"Midas","comment":"Çeyrek (25) + Bilezik (2)","clean_name":"Fiziki Altın","key":"altin"},{"category":"🔗 Bitcoin","value_try":4683.06,"pct":0.004606213313726242,"platform":"Midas","comment":"0.00136 BTC","clean_name":"Bitcoin","key":"bitcoin"},{"category":"🌐 VOO (S&P 500 ETF)","value_try":22838.05755,"pct":0.022463296380242005,"platform":"Midas","comment":"$636.22","clean_name":"VOO (S&P 500 ETF)","key":"voo"}],"total_try":1016683.266935285,"stocks":[{"code":"CLEBI","name":"Çelebi Hava Servisi","qty":3.0,"avg_cost":1464.0,"pnl":1065.0,"market_value_try":5457.0,"price":1819.0,"sector":"Havacılık","platform":"Midas","pct":0.005367453343114139},{"code":"MGROS","name":"Migros Ticaret","qty":8.0,"avg_cost":507.01,"pnl":1039.91,"market_value_try":5096.0,"price":637.0,"sector":"Perakende","platform":"Midas","pct":0.005012377173631968},{"code":"SISE","name":"Türkiye Şişe ve Cam","qty":842.0,"avg_cost":41.18,"pnl":3635.46,"market_value_try":38311.0,"price":45.5,"sector":"Cam/Sanayi","platform":"Midas","pct":0.037682335537483194},{"code":"EREGL","name":"Ereğli Demir ve Çeli","qty":522.0,"avg_cost":24.57,"pnl":1886.8,"market_value_try":14709.96,"price":28.18,"sector":"Metal","platform":"Midas","pct":0.014468576869905674},{"code":"ENJSA","name":"Enerjisa Enerji","qty":151.0,"avg_cost":80.99,"pnl":3580.35,"market_value_try":15809.7,"price":104.7,"sector":"Enerji","platform":"Midas","pct":0.015550270683274988},{"code":"LOGO","name":"Logo Yazılım","qty":12.0,"avg_cost":149.47,"pnl":188.8,"market_value_try":1982.4,"price":165.20000000000002,"sector":"Teknoloji","platform":"Midas","pct":0.0019498698016106781},{"code":"FROTO","name":"Ford Otomotiv","qty":30.0,"avg_cost":90.09,"pnl":708.22,"market_value_try":3411.0,"price":113.7,"sector":"Otomotiv","platform":"Midas","pct":0.0033550271858827797},{"code":"TTRAK","name":"Türk Traktör ve Zira","qty":24.0,"avg_cost":529.17,"pnl":1520.0,"market_value_try":14220.0,"price":592.5,"sector":"Tarım Mak.","platform":"Midas","pct":0.013986656869907103},{"code":"AKSA","name":"Aksa Akrilik Kimya","qty":238.0,"avg_cost":10.49,"pnl":139.69,"market_value_try":2637.04,"price":11.08,"sector":"Kimya","platform":"Midas","pct":0.0025937674846849383},{"code":"ISMEN","name":"İş Yatırım Menkul De","qty":727.0,"avg_cost":40.75,"pnl":5311.2,"market_value_try":34939.62,"price":48.06,"sector":"Finans","platform":"Midas","pct":0.034366278207098706},{"code":"VESBE","name":"Vestel Beyaz Eşya","qty":649.0,"avg_cost":8.97,"pnl":-471.9,"market_value_try":5347.76,"price":8.24,"sector":"Tüketim El.","platform":"Midas","pct":0.005260005917202139},{"code":"MAVI","name":"Mavi Giyim","qty":138.0,"avg_cost":36.26,"pnl":1667.72,"market_value_try":6670.92,"price":48.34,"sector":"Perakende","platform":"Midas","pct":0.006561453519451525},{"code":"TUPRS","name":"Tüpraş - Türkiye Pet","qty":121.0,"avg_cost":191.65,"pnl":6430.67,"market_value_try":29620.8,"price":244.79999999999998,"sector":"Enerji","platform":"Midas","pct":0.02913473739888497},{"code":"TABGD","name":"Tab Gıda San. ve Tic","qty":28.0,"avg_cost":219.34,"pnl":1376.6,"market_value_try":7518.0,"price":268.5,"sector":"Gıda","platform":"Midas","pct":0.007394633357803207},{"code":"RYGYO","name":"Reysaş Gayrimenkul Y","qty":1045.0,"avg_cost":20.79,"pnl":7786.24,"market_value_try":29510.8,"price":28.24,"sector":"GYO","platform":"Midas","pct":0.029026542444195114},{"code":"RYSAS","name":"Reysaş Taşımacılık v","qty":300.0,"avg_cost":14.11,"pnl":1285.65,"market_value_try":5520.0,"price":18.4,"sector":"Lojistik","platform":"Midas","pct":0.005429419544436513},{"code":"ENKAI","name":"Enka İnşaat","qty":76.0,"avg_cost":68.33,"pnl":2243.29,"market_value_try":7436.6,"price":97.85000000000001,"sector":"İnşaat","platform":"Midas","pct":0.007314569091332712},{"code":"GWIND","name":"Galata Wind Enerji","qty":542.0,"avg_cost":23.81,"pnl":1433.94,"market_value_try":14341.32,"price":26.46,"sector":"Enerji","platform":"Midas","pct":0.014105986069025044}],"funds":[{"code":"KOCMT","name":"Eski","qty":0.285,"unit_price":2.75,"market_value_try":0.78,"platform":"İş Bankası"},{"code":"PATEK","name":"Eski","qty":0.82,"unit_price":19.6,"market_value_try":16.07,"platform":"İş Bankası"},{"code":"BINHO","name":"Eski","qty":0.35,"unit_price":8.9,"market_value_try":3.11,"platform":"İş Bankası"},{"code":"TGE","name":"İş Emtia Yabancı BY","qty":1744.0,"unit_price":0.2487177914452765,"market_value_try":433.7638282805622,"platform":"İş Bankası"},{"code":"TTA","name":"İş Altın Fonu","qty":3873.0,"unit_price":0.7112257756375475,"market_value_try":2754.5774290442214,"platform":"İş Bankası"},{"code":"HVS","name":"HSBC PORTFÖY HİSSE","qty":26523.0,"unit_price":1.5311879236984884,"market_value_try":40611.69730025501,"platform":"İş Bankası"},{"code":"AAV","name":"ATA PORTFÖY İKİNCİ","qty":10.0,"unit_price":62.362994,"market_value_try":623.62,"platform":"İş Bankası"},{"code":"YTD","name":"YAPI KREDİ PORTFÖY","qty":1747.0,"unit_price":0.8301441167235051,"market_value_try":1450.2617719159634,"platform":"İş Bankası"},{"code":"TCD","name":"TACİRLER PORTFÖY DE","qty":36.0,"unit_price":42.83439695523691,"market_value_try":1542.0382903885288,"platform":"İş Bankası"},{"code":"AES","name":"AK PORTFÖY PETROL Y","qty":36198.0,"unit_price":0.109303,"market_value_try":3956.54,"platform":"İş Bankası"},{"code":"MAC","name":"MARMARA CAPITAL POR","qty":42966.0,"unit_price":0.797652747368853,"market_value_try":34271.94794345014,"platform":"İş Bankası"},{"code":"AN1","name":"STRATEJİ PORTFÖY Bİ","qty":15.0,"unit_price":86.92739543875037,"market_value_try":1303.9109315812555,"platform":"İş Bankası"},{"code":"GSP","name":"AZİMUT PYŞ KAR PAYI","qty":1589.0,"unit_price":0.503996,"market_value_try":800.84,"platform":"İş Bankası"},{"code":"GBG","name":"INVEO PORTFÖY G-20","qty":1913.0,"unit_price":0.46208750893684025,"market_value_try":883.9734045961754,"platform":"İş Bankası"},{"code":"DBH","name":"DENİZ PORTFÖY EUROB","qty":37300.0,"unit_price":0.34055910220664254,"market_value_try":12702.854512307767,"platform":"İş Bankası"},{"code":"IPV","name":"İŞ PORTFÖY EUROBOND","qty":11.0,"unit_price":70.20890203349785,"market_value_try":772.2979223684763,"platform":"İş Bankası"},{"code":"OPH","name":"OSMANLI PORTFÖY BİR","qty":119.0,"unit_price":24.353021938579634,"market_value_try":2898.0096106909764,"platform":"İş Bankası"},{"code":"ZDZ","name":"ZİRAAT PORTFÖY AGRE","qty":25.0,"unit_price":12.161417396159838,"market_value_try":304.03543490399596,"platform":"İş Bankası"},{"code":"MKG","name":"AKTİF PORTFÖY ALTIN","qty":1501.0,"unit_price":19.343143494534605,"market_value_try":29034.05838529644,"platform":"İş Bankası"},{"code":"YZG","name":"YAPI KREDİ PORTFÖY","qty":3020.0,"unit_price":21.481368834226355,"market_value_try":64873.73387936359,"platform":"İş Bankası"},{"code":"ITP","name":"İŞ PORTFÖY TEKNOLOJ","qty":97.0,"unit_price":10.250791515224053,"market_value_try":994.3267769767332,"platform":"İş Bankası"},{"code":"OJT","name":"QNB PORTFÖY TEKNOLO","qty":2397.0,"unit_price":9.793913608267818,"market_value_try":23476.01091901796,"platform":"İş Bankası"},{"code":"GJB","name":"INVEO PORTFÖY BİRİN","qty":581.0,"unit_price":9.829248510678449,"market_value_try":5710.793384704179,"platform":"İş Bankası"},{"code":"IJC","name":"İŞ PORTFÖY YARI İLE","qty":151.0,"unit_price":11.380110483912725,"market_value_try":1718.3966830708216,"platform":"İş Bankası"},{"code":"ZFB","name":"AK PORTFÖY FİNTEK V","qty":173.0,"unit_price":6.107380872659522,"market_value_try":1056.5768909700973,"platform":"İş Bankası"},{"code":"YJK","name":"YAPI KREDİ PORTFÖY","qty":322.0,"unit_price":4.376262247016166,"market_value_try":1409.1564435392056,"platform":"İş Bankası"},{"code":"OLD","name":"QNB PORTFÖY TEMİZ E","qty":292.0,"unit_price":2.9491397000805675,"market_value_try":861.1487924235257,"platform":"İş Bankası"},{"code":"DHM","name":"DENİZ PORTFÖY ESG-S","qty":786.0,"unit_price":4.943100681675269,"market_value_try":3885.2771357967617,"platform":"İş Bankası"},{"code":"DMG","name":"DENİZ PORTFÖY GÜMÜŞ","qty":6424.0,"unit_price":10.55724578204134,"market_value_try":67819.74690383357,"platform":"İş Bankası"},{"code":"IEV","name":"İŞ PORTFÖY TAŞIMACI","qty":538.0,"unit_price":4.4352584491676526,"market_value_try":2386.169045652197,"platform":"İş Bankası"},{"code":"GVI","name":"GARANTİ PORTFÖY ÜÇÜ","qty":822.0,"unit_price":5.50827146503572,"market_value_try":4527.799144259362,"platform":"İş Bankası"},{"code":"DVT","name":"DENİZ PORTFÖY METAV","qty":132.0,"unit_price":7.417090926539255,"market_value_try":979.0560023031817,"platform":"İş Bankası"},{"code":"NHY","name":"NEO PORTFÖY BİRİNCİ","qty":57.0,"unit_price":5.507965,"market_value_try":313.95,"platform":"İş Bankası"},{"code":"RTG","name":"ATA PORTFÖY ROBOTİK","qty":401.0,"unit_price":4.555401178665236,"market_value_try":1826.7158726447597,"platform":"İş Bankası"},{"code":"CPU","name":"AKTİF PORTFÖY TEKNO","qty":228.0,"unit_price":2.8007325507986147,"market_value_try":638.5670215820842,"platform":"İş Bankası"},{"code":"CPT","name":"ROTA PORTFÖY ÇİP TE","qty":719.0,"unit_price":2.823634966638396,"market_value_try":2030.1935410130068,"platform":"İş Bankası"},{"code":"GPT","name":"AKTİF PORTFÖY ROBOT","qty":439.0,"unit_price":2.311171534320457,"market_value_try":1014.6043035666806,"platform":"İş Bankası"},{"code":"JET","name":"ATA PORTFÖY HAVACIL","qty":1183.0,"unit_price":2.261362865009236,"market_value_try":2675.192269305926,"platform":"İş Bankası"},{"code":"KPH","name":"İŞ PORTFÖY KAR PAYI","qty":9008.0,"unit_price":1.281124,"market_value_try":11540.36,"platform":"İş Bankası"},{"code":"GID","name":"GARANTİ PORTFÖY İNŞ","qty":927.0,"unit_price":1.6314962592146498,"market_value_try":1512.3970322919804,"platform":"İş Bankası"},{"code":"NPH","name":"NUROL PORTFÖY BİRİN","qty":839.0,"unit_price":1.704933,"market_value_try":1430.43,"platform":"İş Bankası"},{"code":"URA","name":"ATA PORTFÖY ENERJİ","qty":526.0,"unit_price":1.935552429448074,"market_value_try":1018.1005778896869,"platform":"İş Bankası"},{"code":"BDS","name":"Pardus Portföy BIST","qty":420.0,"unit_price":2.6162142857142854,"market_value_try":1098.81,"platform":"Midas"},{"code":"KHA","name":"Pardus Portföy İkinc","qty":1085.0,"unit_price":2.713364055299539,"market_value_try":2944.0,"platform":"Midas"}],"gold":[{"type":"Çeyrek Altın","qty":25,"total_gram":43.75,"cost_try":194001.2,"current_value_try":302419.51,"profit_try":108418.31,"profit_pct":0.5588538112135388},{"type":"Bilezik","qty":2,"total_gram":14.770000000000003,"cost_try":65494.8,"current_value_try":102096.82,"profit_try":36602.02,"profit_pct":0.5588538326706852}],"gold_total":{"type":"TOPLAM ALTIN","qty":27,"total_gram":58.52,"cost_try":259496,"current_value_try":404516.33,"profit_try":145020.33000000002,"profit_pct":0.5588538166291581},"crypto_etf":[{"asset":"Bitcoin","type":"Kripto Para","qty":0.00136,"avg_cost":3426584.6,"current_price":3443426.47,"currency":"TRY","total_value_try":4683.06,"profit_pct":0.004915060491497922},{"asset":"VOO","type":"ETF (S&P 500)","qty":0.83180224,"avg_cost":632.45,"current_price":636.2209,"currency":"USD","total_value_try":22838.05755,"profit_pct":0.005968749679381197}],"usd_try_rate":"43,155"},"ŞUBAT":{"report_date":"28.02.2026","sheet_name":"ŞUBAT","display_name":"Şubat","summary":[{"category":"📈 Hisse Senetleri","value_try":248757.71,"pct":0.23466958721503836,"platform":"Midas","comment":"18 pozisyon, BIST","clean_name":"Hisse Senetleri","key":"hisse"},{"category":"📊 Yatırım Fonları","value_try":325661.7857378515,"pct":0.3072182841320331,"platform":"İş B./Midas","comment":"45 fon","clean_name":"Yatırım Fonları","key":"fon"},{"category":"🥇 Fiziki Altın","value_try":443219.79,"pct":0.41811851847661724,"platform":"Midas","comment":"Çeyrek (25) + Bilezik (2)","clean_name":"Fiziki Altın","key":"altin"},{"category":"🔗 Bitcoin","value_try":19502.38,"pct":0.01839788388593391,"platform":"Midas","comment":"0.0066223 BTC","clean_name":"Bitcoin","key":"bitcoin"},{"category":"🌐 VOO (S&P 500 ETF)","value_try":22892.20125,"pct":0.021595726290377433,"platform":"Midas","comment":"$631.04","clean_name":"VOO (S&P 500 ETF)","key":"voo"}],"total_try":1060033.8669878514,"stocks":[{"code":"MGROS","name":"Migros Ticaret","qty":8.0,"avg_cost":507.01,"pnl":1107.91,"market_value_try":5164.0,"price":645.5,"sector":"Perakende","platform":"Midas","pct":0.0048715424674815435},{"code":"EREGL","name":"Ereğli Demir ve Çeli","qty":522.0,"avg_cost":24.57,"pnl":4225.36,"market_value_try":17048.52,"price":32.660000000000004,"sector":"Metal","platform":"Midas","pct":0.016082995582437733},{"code":"ENJSA","name":"Enerjisa Enerji","qty":151.0,"avg_cost":80.99,"pnl":3988.05,"market_value_try":16217.4,"price":107.39999999999999,"sector":"Enerji","platform":"Midas","pct":0.015298945161141591},{"code":"LOGO","name":"Logo Yazılım","qty":12.0,"avg_cost":149.47,"pnl":-132.8,"market_value_try":1660.8,"price":138.4,"sector":"Teknoloji","platform":"Midas","pct":0.001566742395428611},{"code":"FROTO","name":"Ford Otomotiv","qty":30.0,"avg_cost":90.09,"pnl":774.22,"market_value_try":3477.0,"price":115.9,"sector":"Otomotiv","platform":"Midas","pct":0.0032800838806028906},{"code":"TTRAK","name":"Türk Traktör ve Zira","qty":24.0,"avg_cost":529.17,"pnl":-436.0,"market_value_try":12264.0,"price":511.0,"sector":"Tarım Mak.","platform":"Midas","pct":0.011569441677225727},{"code":"AKSA","name":"Aksa Akrilik Kimya","qty":238.0,"avg_cost":10.49,"pnl":-74.51,"market_value_try":2422.84,"price":10.180000000000001,"sector":"Kimya","platform":"Midas","pct":0.0022856250875121966},{"code":"VESBE","name":"Vestel Beyaz Eşya","qty":649.0,"avg_cost":8.97,"pnl":-595.21,"market_value_try":5224.45,"price":8.049999999999999,"sector":"Tüketim El.","platform":"Midas","pct":0.0049285689473729565},{"code":"MAVI","name":"Mavi Giyim","qty":138.0,"avg_cost":36.26,"pnl":1262.0,"market_value_try":6265.2,"price":45.4,"sector":"Perakende","platform":"Midas","pct":0.005910377201252007},{"code":"TUPRS","name":"Tüpraş - Türkiye Pet","qty":121.0,"avg_cost":191.65,"pnl":3248.37,"market_value_try":26438.5,"price":218.5,"sector":"Enerji","platform":"Midas","pct":0.024941184261524165},{"code":"TABGD","name":"Tab Gıda San. ve Tic","qty":28.0,"avg_cost":219.34,"pnl":1145.6,"market_value_try":7287.0,"price":260.25,"sector":"Gıda","platform":"Midas","pct":0.006874308667803642},{"code":"RYGYO","name":"Reysaş Gayrimenkul Y","qty":1045.0,"avg_cost":20.79,"pnl":12091.64,"market_value_try":33816.2,"price":32.36,"sector":"GYO","platform":"Midas","pct":0.03190105623331707},{"code":"RYSAS","name":"Reysaş Taşımacılık v","qty":300.0,"avg_cost":14.11,"pnl":1762.65,"market_value_try":5997.0,"price":19.99,"sector":"Lojistik","platform":"Midas","pct":0.005657366417019136},{"code":"ENKAI","name":"Enka İnşaat","qty":76.0,"avg_cost":68.33,"pnl":2535.89,"market_value_try":7729.2,"price":101.7,"sector":"İnşaat","platform":"Midas","pct":0.00729146515097954},{"code":"SISE","name":"Türkiye Şişe ve Cam","qty":852.0,"avg_cost":41.22,"pnl":3099.78,"market_value_try":38220.72,"price":44.86,"sector":"Cam/Sanayi","platform":"Midas","pct":0.03605613102589488},{"code":"ISMEN","name":"İş Yatırım Menkul De","qty":737.0,"avg_cost":40.85,"pnl":5385.9,"market_value_try":35493.92,"price":48.16,"sector":"Finans","platform":"Midas","pct":0.03348376038291876},{"code":"GWIND","name":"Galata Wind Enerji","qty":592.0,"avg_cost":23.97,"pnl":1128.78,"market_value_try":15320.96,"price":25.88,"sector":"Enerji","platform":"Midas","pct":0.014453274067115806},{"code":"CLEBI","name":"Çelebi Hava Servisi","qty":5.0,"avg_cost":1581.8,"pnl":801.0,"market_value_try":8710.0,"price":1742.0,"sector":"Havacılık","platform":"Midas","pct":0.008216718608010118}],"funds":[{"code":"KOCMT","name":"Eski","qty":0.285,"unit_price":2.58,"market_value_try":0.73,"platform":"İş Bankası"},{"code":"PATEK","name":"Eski","qty":0.82,"unit_price":19.29,"market_value_try":15.81,"platform":"İş Bankası"},{"code":"EMPAE","name":"Eski","qty":20.0,"unit_price":26.62,"market_value_try":532.4,"platform":"İş Bankası"},{"code":"BINHO","name":"Eski","qty":0.35,"unit_price":9.0,"market_value_try":3.15,"platform":"İş Bankası"},{"code":"TGE","name":"İş Emtia Yabancı BY","qty":1744.0,"unit_price":0.2455195293650817,"market_value_try":428.1860592127025,"platform":"İş Bankası"},{"code":"TTA","name":"İş Altın Fonu","qty":3873.0,"unit_price":0.7126816548002776,"market_value_try":2760.216049041475,"platform":"İş Bankası"},{"code":"HVS","name":"HSBC PORTFÖY HİSSE","qty":26523.0,"unit_price":1.5501991529591288,"market_value_try":41115.93213393497,"platform":"İş Bankası"},{"code":"AAV","name":"ATA PORTFÖY İKİNCİ","qty":10.0,"unit_price":62.797823,"market_value_try":627.97,"platform":"İş Bankası"},{"code":"YTD","name":"YAPI KREDİ PORTFÖY","qty":1747.0,"unit_price":0.8117041254587258,"market_value_try":1418.047107176394,"platform":"İş Bankası"},{"code":"TCD","name":"TACİRLER PORTFÖY DE","qty":36.0,"unit_price":42.941482947625005,"market_value_try":1545.8933861145001,"platform":"İş Bankası"},{"code":"AES","name":"AK PORTFÖY PETROL Y","qty":36198.0,"unit_price":0.109062,"market_value_try":3947.82,"platform":"İş Bankası"},{"code":"MAC","name":"MARMARA CAPITAL POR","qty":42966.0,"unit_price":0.7794192032167485,"market_value_try":33488.52548541081,"platform":"İş Bankası"},{"code":"AN1","name":"STRATEJİ PORTFÖY Bİ","qty":15.0,"unit_price":87.42844494605933,"market_value_try":1311.42667419089,"platform":"İş Bankası"},{"code":"GSP","name":"AZİMUT PYŞ KAR PAYI","qty":1589.0,"unit_price":0.514781,"market_value_try":817.98,"platform":"İş Bankası"},{"code":"GBG","name":"INVEO PORTFÖY G-20","qty":1913.0,"unit_price":0.4772070122292537,"market_value_try":912.8970143945623,"platform":"İş Bankası"},{"code":"DBH","name":"DENİZ PORTFÖY EUROB","qty":37300.0,"unit_price":0.34876827936533367,"market_value_try":13009.056820326945,"platform":"İş Bankası"},{"code":"IPV","name":"İŞ PORTFÖY EUROBOND","qty":11.0,"unit_price":71.45553129800464,"market_value_try":786.0108442780511,"platform":"İş Bankası"},{"code":"OPH","name":"OSMANLI PORTFÖY BİR","qty":119.0,"unit_price":24.216498897591958,"market_value_try":2881.763368813443,"platform":"İş Bankası"},{"code":"ZDZ","name":"ZİRAAT PORTFÖY AGRE","qty":25.0,"unit_price":11.85779544944731,"market_value_try":296.44488623618275,"platform":"İş Bankası"},{"code":"MKG","name":"AKTİF PORTFÖY ALTIN","qty":1501.0,"unit_price":19.27000706898177,"market_value_try":28924.280610541635,"platform":"İş Bankası"},{"code":"YZG","name":"YAPI KREDİ PORTFÖY","qty":3020.0,"unit_price":18.6704457967925,"market_value_try":56384.74630631335,"platform":"İş Bankası"},{"code":"ITP","name":"İŞ PORTFÖY TEKNOLOJ","qty":97.0,"unit_price":10.302147980715326,"market_value_try":999.3083541293865,"platform":"İş Bankası"},{"code":"OJT","name":"QNB PORTFÖY TEKNOLO","qty":2397.0,"unit_price":9.699147700194219,"market_value_try":23248.857037365542,"platform":"İş Bankası"},{"code":"GJB","name":"INVEO PORTFÖY BİRİN","qty":581.0,"unit_price":9.885855152851446,"market_value_try":5743.68184380669,"platform":"İş Bankası"},{"code":"IJC","name":"İŞ PORTFÖY YARI İLE","qty":151.0,"unit_price":11.767580485668987,"market_value_try":1776.904653336017,"platform":"İş Bankası"},{"code":"ZFB","name":"AK PORTFÖY FİNTEK V","qty":173.0,"unit_price":5.948320245211978,"market_value_try":1029.059402421672,"platform":"İş Bankası"},{"code":"YJK","name":"YAPI KREDİ PORTFÖY","qty":322.0,"unit_price":4.4665401609098625,"market_value_try":1438.2259318129757,"platform":"İş Bankası"},{"code":"OLD","name":"QNB PORTFÖY TEMİZ E","qty":292.0,"unit_price":2.978660588478374,"market_value_try":869.7688918356853,"platform":"İş Bankası"},{"code":"DHM","name":"DENİZ PORTFÖY ESG-S","qty":786.0,"unit_price":4.998616645431165,"market_value_try":3928.9126833088953,"platform":"İş Bankası"},{"code":"DMG","name":"DENİZ PORTFÖY GÜMÜŞ","qty":6424.0,"unit_price":9.182312320371404,"market_value_try":58987.1743460659,"platform":"İş Bankası"},{"code":"IEV","name":"İŞ PORTFÖY TAŞIMACI","qty":538.0,"unit_price":4.64756540061241,"market_value_try":2500.3901855294766,"platform":"İş Bankası"},{"code":"GVI","name":"GARANTİ PORTFÖY ÜÇÜ","qty":822.0,"unit_price":5.578000673511607,"market_value_try":4585.116553626541,"platform":"İş Bankası"},{"code":"DVT","name":"DENİZ PORTFÖY METAV","qty":132.0,"unit_price":7.3887131366543155,"market_value_try":975.3101340383696,"platform":"İş Bankası"},{"code":"NHY","name":"NEO PORTFÖY BİRİNCİ","qty":57.0,"unit_price":5.458925,"market_value_try":311.15,"platform":"İş Bankası"},{"code":"RTG","name":"ATA PORTFÖY ROBOTİK","qty":401.0,"unit_price":4.41027065251414,"market_value_try":1768.51853165817,"platform":"İş Bankası"},{"code":"CPU","name":"AKTİF PORTFÖY TEKNO","qty":228.0,"unit_price":2.87285421471423,"market_value_try":655.0107609548445,"platform":"İş Bankası"},{"code":"CPT","name":"ROTA PORTFÖY ÇİP TE","qty":719.0,"unit_price":2.9340221520241574,"market_value_try":2109.561927305369,"platform":"İş Bankası"},{"code":"GPT","name":"AKTİF PORTFÖY ROBOT","qty":439.0,"unit_price":2.3285538554300813,"market_value_try":1022.2351425338057,"platform":"İş Bankası"},{"code":"JET","name":"ATA PORTFÖY HAVACIL","qty":1183.0,"unit_price":2.3051428500758147,"market_value_try":2726.9839916396886,"platform":"İş Bankası"},{"code":"KPH","name":"İŞ PORTFÖY KAR PAYI","qty":9008.0,"unit_price":1.308035,"market_value_try":11782.77,"platform":"İş Bankası"},{"code":"GID","name":"GARANTİ PORTFÖY İNŞ","qty":927.0,"unit_price":1.6258121262475458,"market_value_try":1507.1278410314749,"platform":"İş Bankası"},{"code":"NPH","name":"NUROL PORTFÖY BİRİN","qty":839.0,"unit_price":1.618598,"market_value_try":1358.0,"platform":"İş Bankası"},{"code":"URA","name":"ATA PORTFÖY ENERJİ","qty":526.0,"unit_price":1.8467125084888367,"market_value_try":971.3707794651281,"platform":"İş Bankası"},{"code":"BDS","name":"Pardus Portföy BIST","qty":420.0,"unit_price":2.3876904761904765,"market_value_try":1002.83,"platform":"Midas"},{"code":"KHA","name":"Pardus Portföy İkinc","qty":1085.0,"unit_price":2.9071244239631335,"market_value_try":3154.23,"platform":"Midas"}],"gold":[{"type":"Çeyrek Altın","qty":25,"total_gram":43.75,"cost_try":194001.2,"current_value_try":331354.51,"profit_try":137353.31,"profit_pct":0.7080023731811967},{"type":"Bilezik","qty":2,"total_gram":14.770000000000003,"cost_try":65494.8,"current_value_try":111865.28,"profit_try":46370.48,"profit_pct":0.7080024673714554}],"gold_total":{"type":"TOPLAM ALTIN","qty":27,"total_gram":58.52,"cost_try":259496,"current_value_try":443219.79,"profit_try":183723.78999999998,"profit_pct":0.7080023969540955},"crypto_etf":[{"asset":"Bitcoin","type":"Kripto Para","qty":0.0066223,"avg_cost":2990297.82,"current_price":2944955.68,"currency":"TRY","total_value_try":19502.38,"profit_pct":-0.015163084976352688},{"asset":"VOO","type":"ETF (S&P 500)","qty":0.83180224,"avg_cost":632.45,"current_price":631.0394,"currency":"USD","total_value_try":22892.20125,"profit_pct":-0.0022240245620624203}],"usd_try_rate":"43,6125"},"MART":{"report_date":"31.03.2026","sheet_name":"MART","display_name":"Mart","summary":[{"category":"📈 Hisse Senetleri","value_try":280393.89,"pct":0.27401018556043133,"platform":"Midas","comment":"20 pozisyon, BIST","clean_name":"Hisse Senetleri","key":"hisse"},{"category":"📊 Yatırım Fonları","value_try":282461.18359034136,"pct":0.27603041324904937,"platform":"İş B./Midas","comment":"43 fon","clean_name":"Yatırım Fonları","key":"fon"},{"category":"🥇 Fiziki Altın","value_try":407569,"pct":0.39828991037814493,"platform":"Midas","comment":"Çeyrek (25) + Bilezik (2)","clean_name":"Fiziki Altın","key":"altin"},{"category":"🔗 Bitcoin","value_try":30887.01,"pct":0.030183808004899455,"platform":"Midas","comment":"0.0101907 BTC","clean_name":"Bitcoin","key":"bitcoin"},{"category":"🌐 VOO (S&P 500 ETF)","value_try":21986.24175,"pct":0.021485682807474878,"platform":"Midas","comment":"$597.55","clean_name":"VOO (S&P 500 ETF)","key":"voo"}],"total_try":1023297.3253403414,"stocks":[{"code":"EREGL","name":"Ereğli Demir ve Çeli","qty":522.0,"avg_cost":24.57,"pnl":1907.68,"market_value_try":14730.84,"price":28.22,"sector":"Metal","platform":"Midas","pct":0.014395464187400888},{"code":"LOGO","name":"Logo Yazılım","qty":12.0,"avg_cost":149.47,"pnl":-212.0,"market_value_try":1581.6,"price":131.79999999999998,"sector":"Teknoloji","platform":"Midas","pct":0.001545591843967706},{"code":"TTRAK","name":"Türk Traktör ve Zira","qty":24.0,"avg_cost":529.17,"pnl":-2032.0,"market_value_try":10668.0,"price":444.5,"sector":"Tarım Mak.","platform":"Midas","pct":0.010425122528735134},{"code":"VESBE","name":"Vestel Beyaz Eşya","qty":649.0,"avg_cost":8.97,"pnl":-1302.62,"market_value_try":4517.04,"price":6.96,"sector":"Tüketim El.","platform":"Midas","pct":0.004414200924934173},{"code":"MGROS","name":"Migros Ticaret","qty":12.0,"avg_cost":528.51,"pnl":887.91,"market_value_try":7230.0,"price":602.5,"sector":"Perakende","platform":"Midas","pct":0.007065395189609582},{"code":"GWIND","name":"Galata Wind Enerji","qty":640.0,"avg_cost":23.98,"pnl":3338.06,"market_value_try":18688.0,"price":29.2,"sector":"Enerji","platform":"Midas","pct":0.018262531853862222},{"code":"CLEBI","name":"Çelebi Hava Servisi","qty":6.0,"avg_cost":1596.5,"pnl":759.0,"market_value_try":10338.0,"price":1723.0,"sector":"Havacılık","platform":"Midas","pct":0.010102635611367062},{"code":"FROTO","name":"Ford Otomotiv","qty":30.0,"avg_cost":87.1,"pnl":419.91,"market_value_try":3033.0,"price":101.1,"sector":"Otomotiv","platform":"Midas","pct":0.0029639479405374636},{"code":"MPARK","name":"MLP Sağlık Hizmetler","qty":3.0,"avg_cost":433.0,"pnl":-22.5,"market_value_try":1276.5,"price":425.5,"sector":"Sağlık","platform":"Midas","pct":0.0012474380303646793},{"code":"SISE","name":"Türkiye Şişe ve Cam","qty":854.0,"avg_cost":41.23,"pnl":2350.3,"market_value_try":37558.92,"price":43.98,"sector":"Cam/Sanayi","platform":"Midas","pct":0.03670381918325465},{"code":"MAVI","name":"Mavi Giyim","qty":208.0,"avg_cost":37.93,"pnl":867.0,"market_value_try":8756.8,"price":42.099999999999994,"sector":"Perakende","platform":"Midas","pct":0.008557434660632529},{"code":"AKSA","name":"Aksa Akrilik Kimya","qty":357.0,"avg_cost":10.29,"pnl":193.22,"market_value_try":3866.31,"price":10.83,"sector":"Kimya","platform":"Midas","pct":0.003778286040876822},{"code":"TABGD","name":"Tab Gıda San. ve Tic","qty":37.0,"avg_cost":226.02,"pnl":561.7,"market_value_try":8924.4,"price":241.2,"sector":"Gıda","platform":"Midas","pct":0.008721218925332192},{"code":"ENJSA","name":"Enerjisa Enerji","qty":163.0,"avg_cost":83.58,"pnl":5039.75,"market_value_try":18663.5,"price":114.5,"sector":"Enerji","platform":"Midas","pct":0.01823858964333035},{"code":"AGESA","name":"Agesa Hayat Emeklili","qty":1.0,"avg_cost":215.4,"pnl":12.8,"market_value_try":228.2,"price":228.2,"sector":"Sigorta","platform":"Midas","pct":0.00022300458952543659},{"code":"ENKAI","name":"Enka İnşaat","qty":229.0,"avg_cost":84.44,"pnl":2062.44,"market_value_try":21400.05,"price":93.45,"sector":"İnşaat","platform":"Midas","pct":0.020912836836432164},{"code":"ISMEN","name":"İş Yatırım Menkul De","qty":842.0,"avg_cost":41.26,"pnl":1596.9,"market_value_try":36340.72,"price":43.160000000000004,"sector":"Finans","platform":"Midas","pct":0.035513353841624996},{"code":"TUPRS","name":"Tüpraş - Türkiye Pet","qty":129.0,"avg_cost":187.54,"pnl":9121.67,"market_value_try":33314.25,"price":258.25,"sector":"Enerji","platform":"Midas","pct":0.03255578723311909},{"code":"RYSAS","name":"Reysaş Taşımacılık v","qty":350.0,"avg_cost":14.82,"pnl":1226.15,"market_value_try":6412.0,"price":18.32,"sector":"Lojistik","platform":"Midas","pct":0.006266018527769936},{"code":"RYGYO","name":"Reysaş Gayrimenkul Y","qty":1124.0,"avg_cost":21.47,"pnl":8738.42,"market_value_try":32865.76,"price":29.240000000000002,"sector":"GYO","platform":"Midas","pct":0.03211750796775422}],"funds":[{"code":"KOCMT","name":"Eski","qty":0.285,"unit_price":2.43,"market_value_try":0.69,"platform":"İş Bankası"},{"code":"PATEK","name":"Eski","qty":0.82,"unit_price":17.92,"market_value_try":14.69,"platform":"İş Bankası"},{"code":"BINHO","name":"Eski","qty":0.35,"unit_price":9.18,"market_value_try":3.21,"platform":"İş Bankası"},{"code":"TGE","name":"İş Emtia Yabancı BY","qty":1744.0,"unit_price":0.2720103500249859,"market_value_try":474.3860504435754,"platform":"İş Bankası"},{"code":"TTA","name":"İş Altın Fonu","qty":3873.0,"unit_price":0.6196489042643042,"market_value_try":2399.90020621565,"platform":"İş Bankası"},{"code":"HVS","name":"HSBC PORTFÖY HİSSE","qty":26523.0,"unit_price":1.4176524747836645,"market_value_try":37600.39658868714,"platform":"İş Bankası"},{"code":"AAV","name":"ATA PORTFÖY İKİNCİ","qty":10.0,"unit_price":56.854271,"market_value_try":568.54,"platform":"İş Bankası"},{"code":"YTD","name":"YAPI KREDİ PORTFÖY","qty":1747.0,"unit_price":0.7284411396774206,"market_value_try":1272.586671016454,"platform":"İş Bankası"},{"code":"TCD","name":"TACİRLER PORTFÖY DE","qty":36.0,"unit_price":40.97149947591976,"market_value_try":1474.9739811331112,"platform":"İş Bankası"},{"code":"MAC","name":"MARMARA CAPITAL POR","qty":42966.0,"unit_price":0.7265176836368181,"market_value_try":31215.55879513953,"platform":"İş Bankası"},{"code":"AN1","name":"STRATEJİ PORTFÖY Bİ","qty":15.0,"unit_price":86.33987337803595,"market_value_try":1295.0981006705392,"platform":"İş Bankası"},{"code":"GSP","name":"AZİMUT PYŞ KAR PAYI","qty":1589.0,"unit_price":0.490749,"market_value_try":779.8,"platform":"İş Bankası"},{"code":"GBG","name":"INVEO PORTFÖY G-20","qty":1913.0,"unit_price":0.4567815976918172,"market_value_try":873.8231963844463,"platform":"İş Bankası"},{"code":"DBH","name":"DENİZ PORTFÖY EUROB","qty":37300.0,"unit_price":0.33899230449472334,"market_value_try":12644.412957653181,"platform":"İş Bankası"},{"code":"IPV","name":"İŞ PORTFÖY EUROBOND","qty":11.0,"unit_price":70.72475557941995,"market_value_try":777.9723113736194,"platform":"İş Bankası"},{"code":"OPH","name":"OSMANLI PORTFÖY BİR","qty":119.0,"unit_price":22.331510839902297,"market_value_try":2657.449789948373,"platform":"İş Bankası"},{"code":"ZDZ","name":"ZİRAAT PORTFÖY AGRE","qty":25.0,"unit_price":10.727012359797117,"market_value_try":268.17530899492795,"platform":"İş Bankası"},{"code":"MKG","name":"AKTİF PORTFÖY ALTIN","qty":1501.0,"unit_price":17.224919758764873,"market_value_try":25854.604557906074,"platform":"İş Bankası"},{"code":"YZG","name":"YAPI KREDİ PORTFÖY","qty":3020.0,"unit_price":14.337819486080427,"market_value_try":43300.21484796289,"platform":"İş Bankası"},{"code":"ITP","name":"İŞ PORTFÖY TEKNOLOJ","qty":97.0,"unit_price":9.988148812411103,"market_value_try":968.850434803877,"platform":"İş Bankası"},{"code":"OJT","name":"QNB PORTFÖY TEKNOLO","qty":2397.0,"unit_price":9.311821935934663,"market_value_try":22320.437180435387,"platform":"İş Bankası"},{"code":"GJB","name":"INVEO PORTFÖY BİRİN","qty":581.0,"unit_price":9.290509183836427,"market_value_try":5397.785835808964,"platform":"İş Bankası"},{"code":"IJC","name":"İŞ PORTFÖY YARI İLE","qty":151.0,"unit_price":11.427426804150238,"market_value_try":1725.541447426686,"platform":"İş Bankası"},{"code":"ZFB","name":"AK PORTFÖY FİNTEK V","qty":173.0,"unit_price":5.702482117797612,"market_value_try":986.5294063789869,"platform":"İş Bankası"},{"code":"YJK","name":"YAPI KREDİ PORTFÖY","qty":322.0,"unit_price":4.196962129498147,"market_value_try":1351.4218056984034,"platform":"İş Bankası"},{"code":"OLD","name":"QNB PORTFÖY TEMİZ E","qty":292.0,"unit_price":2.821232419056115,"market_value_try":823.7998663643856,"platform":"İş Bankası"},{"code":"DHM","name":"DENİZ PORTFÖY ESG-S","qty":786.0,"unit_price":4.7033733532687725,"market_value_try":3696.8514556692553,"platform":"İş Bankası"},{"code":"DMG","name":"DENİZ PORTFÖY GÜMÜŞ","qty":6424.0,"unit_price":7.3495227812252715,"market_value_try":47213.334346591146,"platform":"İş Bankası"},{"code":"IEV","name":"İŞ PORTFÖY TAŞIMACI","qty":538.0,"unit_price":4.350186280888824,"market_value_try":2340.4002191181876,"platform":"İş Bankası"},{"code":"GVI","name":"GARANTİ PORTFÖY ÜÇÜ","qty":822.0,"unit_price":5.134700225985619,"market_value_try":4220.723585760179,"platform":"İş Bankası"},{"code":"DVT","name":"DENİZ PORTFÖY METAV","qty":132.0,"unit_price":7.0562506003574175,"market_value_try":931.4250792471792,"platform":"İş Bankası"},{"code":"NHY","name":"NEO PORTFÖY BİRİNCİ","qty":57.0,"unit_price":4.984453,"market_value_try":284.11,"platform":"İş Bankası"},{"code":"RTG","name":"ATA PORTFÖY ROBOTİK","qty":401.0,"unit_price":4.1124053829139875,"market_value_try":1649.074558548509,"platform":"İş Bankası"},{"code":"CPU","name":"AKTİF PORTFÖY TEKNO","qty":228.0,"unit_price":2.7096531124847445,"market_value_try":617.8009096465217,"platform":"İş Bankası"},{"code":"CPT","name":"ROTA PORTFÖY ÇİP TE","qty":719.0,"unit_price":2.693238690096143,"market_value_try":1936.4386181791267,"platform":"İş Bankası"},{"code":"GPT","name":"AKTİF PORTFÖY ROBOT","qty":439.0,"unit_price":2.1848774254423344,"market_value_try":959.1611897691848,"platform":"İş Bankası"},{"code":"JET","name":"ATA PORTFÖY HAVACIL","qty":1183.0,"unit_price":2.12713971919296,"market_value_try":2516.406287805272,"platform":"İş Bankası"},{"code":"KPH","name":"İŞ PORTFÖY KAR PAYI","qty":9008.0,"unit_price":1.251985,"market_value_try":11277.88,"platform":"İş Bankası"},{"code":"GID","name":"GARANTİ PORTFÖY İNŞ","qty":927.0,"unit_price":1.5517124869695613,"market_value_try":1438.4374754207834,"platform":"İş Bankası"},{"code":"NPH","name":"NUROL PORTFÖY BİRİN","qty":839.0,"unit_price":1.585743,"market_value_try":1330.43,"platform":"İş Bankası"},{"code":"URA","name":"ATA PORTFÖY ENERJİ","qty":526.0,"unit_price":1.7288793234596895,"market_value_try":909.3905241397966,"platform":"İş Bankası"},{"code":"BDS","name":"Pardus Portföy BIST","qty":420.0,"unit_price":2.2715714285714284,"market_value_try":954.06,"platform":"Midas"},{"code":"KHA","name":"Pardus Portföy İkinc","qty":1085.0,"unit_price":2.888857142857143,"market_value_try":3134.41,"platform":"Midas"}],"gold":[{"type":"Çeyrek Altın","qty":25,"total_gram":40.2,"cost_try":149824,"current_value_try":282300,"profit_try":132476,"profit_pct":0.884210807347288},{"type":"Bilezik","qty":2,"total_gram":18.32,"cost_try":109672,"current_value_try":125269,"profit_try":15597,"profit_pct":0.14221496826902}],"gold_total":{"type":"TOPLAM ALTIN","qty":27,"total_gram":58.52,"cost_try":259496,"current_value_try":407569,"profit_try":148073,"profit_pct":0.570617658846379},"crypto_etf":[{"asset":"Bitcoin","type":"Kripto Para","qty":0.0101907,"avg_cost":2986867.58,"current_price":3030901.7,"currency":"TRY","total_value_try":30887.01,"profit_pct":0.014742576734946765},{"asset":"VOO","type":"ETF (S&P 500)","qty":0.83390021,"avg_cost":632.35,"current_price":597.5535,"currency":"USD","total_value_try":21986.24175,"profit_pct":-0.055033331237371995}],"usd_try_rate":"44,1225"},"NİSAN":{"report_date":"30.04.2026","sheet_name":"NİSAN","display_name":"Nisan","summary":[{"category":"📈 Hisse Senetleri","value_try":330316.92,"pct":0.30493113872707817,"platform":"Midas","comment":"20 pozisyon, BIST","clean_name":"Hisse Senetleri","key":"hisse"},{"category":"📊 Yatırım Fonları","value_try":300858.02078362164,"pct":0.277736238497031,"platform":"İş B./Midas","comment":"43 fon","clean_name":"Yatırım Fonları","key":"fon"},{"category":"🥇 Fiziki Altın","value_try":392001,"pct":0.36187462426131056,"platform":"Midas","comment":"Çeyrek (25) + Bilezik (2)","clean_name":"Fiziki Altın","key":"altin"},{"category":"🔗 Bitcoin","value_try":35443.22,"pct":0.03271930918571883,"platform":"Midas","comment":"0.0102686 BTC","clean_name":"Bitcoin","key":"bitcoin"},{"category":"🌐 VOO (S&P 500 ETF)","value_try":24631.704900000004,"pct":0.022738689328861365,"platform":"Midas","comment":"$660.58","clean_name":"VOO (S&P 500 ETF)","key":"voo"}],"total_try":1083250.8656836217,"stocks":[{"code":"EREGL","name":"Ereğli Demir ve Çeli","qty":522.0,"avg_cost":24.57,"pnl":5509.48,"market_value_try":18332.64,"price":35.12,"sector":"Metal","platform":"Midas","pct":0.01692372522447104},{"code":"TTRAK","name":"Türk Traktör ve Zira","qty":24.0,"avg_cost":529.17,"pnl":-2044.0,"market_value_try":10656.0,"price":444.0,"sector":"Tarım Mak.","platform":"Midas","pct":0.00983705652824489},{"code":"VESBE","name":"Vestel Beyaz Eşya","qty":649.0,"avg_cost":8.97,"pnl":-1198.78,"market_value_try":4620.88,"price":7.12,"sector":"Tüketim El.","platform":"Midas","pct":0.004265752418378026},{"code":"FROTO","name":"Ford Otomotiv","qty":30.0,"avg_cost":87.1,"pnl":326.91,"market_value_try":2940.0,"price":98.0,"sector":"Otomotiv","platform":"Midas","pct":0.0027140527583558536},{"code":"SISE","name":"Türkiye Şişe ve Cam","qty":854.0,"avg_cost":41.23,"pnl":5663.82,"market_value_try":40872.44,"price":47.86,"sector":"Cam/Sanayi","platform":"Midas","pct":0.037731278409093245},{"code":"TABGD","name":"Tab Gıda San. ve Tic","qty":37.0,"avg_cost":226.02,"pnl":1590.3,"market_value_try":9953.0,"price":269.0,"sector":"Gıda","platform":"Midas","pct":0.009188084048950957},{"code":"AGESA","name":"Agesa Hayat Emeklili","qty":1.0,"avg_cost":215.4,"pnl":25.5,"market_value_try":240.9,"price":240.9,"sector":"Sigorta","platform":"Midas","pct":0.00022238615968977048},{"code":"GWIND","name":"Galata Wind Enerji","qty":740.0,"avg_cost":24.59,"pnl":4155.06,"market_value_try":22348.0,"price":30.2,"sector":"Enerji","platform":"Midas","pct":0.02063049355229137},{"code":"ENJSA","name":"Enerjisa Enerji","qty":163.0,"avg_cost":80.17,"pnl":6948.04,"market_value_try":20016.4,"price":122.80000000000001,"sector":"Enerji","platform":"Midas","pct":0.018478083548419767},{"code":"RYGYO","name":"Reysaş Gayrimenkul Y","qty":1187.0,"avg_cost":22.05,"pnl":9790.84,"market_value_try":35966.1,"price":30.299999999999997,"sector":"GYO","platform":"Midas","pct":0.03320200439193961},{"code":"TUPRS","name":"Tüpraş - Türkiye Pet","qty":140.0,"avg_cost":192.69,"pnl":10963.32,"market_value_try":37940.0,"price":271.0,"sector":"Enerji","platform":"Midas","pct":0.03502420464354459},{"code":"MAVI","name":"Mavi Giyim","qty":263.0,"avg_cost":39.1,"pnl":1108.86,"market_value_try":11393.16,"price":43.32,"sector":"Perakende","platform":"Midas","pct":0.010517563715778768},{"code":"ISMEN","name":"İş Yatırım Menkul De","qty":948.0,"avg_cost":38.62,"pnl":3470.67,"market_value_try":40081.44,"price":42.28,"sector":"Finans","platform":"Midas","pct":0.03700106897648798},{"code":"LOGO","name":"Logo Yazılım","qty":39.0,"avg_cost":140.31,"pnl":128.3,"market_value_try":5600.4,"price":143.6,"sector":"Teknoloji","platform":"Midas","pct":0.005169993560508885},{"code":"CLEBI","name":"Çelebi Hava Servisi","qty":7.0,"avg_cost":1549.06,"pnl":1658.56,"market_value_try":12502.0,"price":1786.0,"sector":"Havacılık","platform":"Midas","pct":0.011541186253389416},{"code":"AKSA","name":"Aksa Akrilik Kimya","qty":524.0,"avg_cost":9.98,"pnl":320.93,"market_value_try":5549.16,"price":10.59,"sector":"Kimya","platform":"Midas","pct":0.005122691498148969},{"code":"ENKAI","name":"Enka İnşaat","qty":254.0,"avg_cost":84.31,"pnl":5152.8,"market_value_try":26568.4,"price":104.60000000000001,"sector":"İnşaat","platform":"Midas","pct":0.024526543981327097},{"code":"MGROS","name":"Migros Ticaret","qty":19.0,"avg_cost":569.66,"pnl":1364.91,"market_value_try":12188.5,"price":641.5,"sector":"Perakende","platform":"Midas","pct":0.011251779607217797},{"code":"MPARK","name":"MLP Sağlık Hizmetler","qty":10.0,"avg_cost":449.38,"pnl":-46.25,"market_value_try":4447.5,"price":444.75,"sector":"Sağlık","platform":"Midas","pct":0.004105697157410769},{"code":"RYSAS","name":"Reysaş Taşımacılık v","qty":405.0,"avg_cost":15.57,"pnl":1795.23,"market_value_try":8100.0,"price":20.0,"sector":"Lojistik","platform":"Midas","pct":0.007477492293429393}],"funds":[{"code":"KOCMT","name":"Eski","qty":0.285,"unit_price":2.58,"market_value_try":0.73,"platform":"İş Bankası"},{"code":"PATEK","name":"Eski","qty":0.82,"unit_price":21.68,"market_value_try":17.77,"platform":"İş Bankası"},{"code":"BINHO","name":"Eski","qty":0.35,"unit_price":10.07,"market_value_try":3.52,"platform":"İş Bankası"},{"code":"TGE","name":"İş Emtia Yabancı BY","qty":1744.0,"unit_price":0.2819539603804993,"market_value_try":491.7277069035908,"platform":"İş Bankası"},{"code":"TTA","name":"İş Altın Fonu","qty":3873.0,"unit_price":0.6146539144470297,"market_value_try":2380.5546106533457,"platform":"İş Bankası"},{"code":"HVS","name":"HSBC PORTFÖY HİSSE","qty":26523.0,"unit_price":1.5787502490606558,"market_value_try":41873.192855835776,"platform":"İş Bankası"},{"code":"AAV","name":"ATA PORTFÖY İKİNCİ","qty":10.0,"unit_price":61.733226,"market_value_try":617.33,"platform":"İş Bankası"},{"code":"YTD","name":"YAPI KREDİ PORTFÖY","qty":1747.0,"unit_price":0.8245108709426375,"market_value_try":1440.4204915367877,"platform":"İş Bankası"},{"code":"TCD","name":"TACİRLER PORTFÖY DE","qty":36.0,"unit_price":45.33824189006328,"market_value_try":1632.176708042278,"platform":"İş Bankası"},{"code":"MAC","name":"MARMARA CAPITAL POR","qty":42966.0,"unit_price":0.7747744412193428,"market_value_try":33288.95864143028,"platform":"İş Bankası"},{"code":"AN1","name":"STRATEJİ PORTFÖY Bİ","qty":15.0,"unit_price":98.07242609163049,"market_value_try":1471.0863913744574,"platform":"İş Bankası"},{"code":"GSP","name":"AZİMUT PYŞ KAR PAYI","qty":1589.0,"unit_price":0.543136,"market_value_try":863.04,"platform":"İş Bankası"},{"code":"GBG","name":"INVEO PORTFÖY G-20","qty":1913.0,"unit_price":0.5238444447385391,"market_value_try":1002.1144227848253,"platform":"İş Bankası"},{"code":"DBH","name":"DENİZ PORTFÖY EUROB","qty":37300.0,"unit_price":0.353785928662873,"market_value_try":13196.215139125163,"platform":"İş Bankası"},{"code":"IPV","name":"İŞ PORTFÖY EUROBOND","qty":11.0,"unit_price":73.00973098267986,"market_value_try":803.1070408094783,"platform":"İş Bankası"},{"code":"OPH","name":"OSMANLI PORTFÖY BİR","qty":119.0,"unit_price":24.283820843569913,"market_value_try":2889.7746803848195,"platform":"İş Bankası"},{"code":"ZDZ","name":"ZİRAAT PORTFÖY AGRE","qty":25.0,"unit_price":12.78733889673099,"market_value_try":319.68347241827473,"platform":"İş Bankası"},{"code":"MKG","name":"AKTİF PORTFÖY ALTIN","qty":1501.0,"unit_price":17.276508393442374,"market_value_try":25932.039098557,"platform":"İş Bankası"},{"code":"YZG","name":"YAPI KREDİ PORTFÖY","qty":3020.0,"unit_price":14.31754580932711,"market_value_try":43238.98834416787,"platform":"İş Bankası"},{"code":"ITP","name":"İŞ PORTFÖY TEKNOLOJ","qty":97.0,"unit_price":11.360480506641139,"market_value_try":1101.9666091441904,"platform":"İş Bankası"},{"code":"OJT","name":"QNB PORTFÖY TEKNOLO","qty":2397.0,"unit_price":11.286496207490904,"market_value_try":27053.731409355696,"platform":"İş Bankası"},{"code":"GJB","name":"INVEO PORTFÖY BİRİN","qty":581.0,"unit_price":10.098541929591418,"market_value_try":5867.252861092614,"platform":"İş Bankası"},{"code":"IJC","name":"İŞ PORTFÖY YARI İLE","qty":151.0,"unit_price":15.322545222332476,"market_value_try":2313.704328572204,"platform":"İş Bankası"},{"code":"ZFB","name":"AK PORTFÖY FİNTEK V","qty":173.0,"unit_price":6.792403227454388,"market_value_try":1175.085758349609,"platform":"İş Bankası"},{"code":"YJK","name":"YAPI KREDİ PORTFÖY","qty":322.0,"unit_price":5.148933867559435,"market_value_try":1657.9567053541382,"platform":"İş Bankası"},{"code":"OLD","name":"QNB PORTFÖY TEMİZ E","qty":292.0,"unit_price":3.1230422207818997,"market_value_try":911.9283284683147,"platform":"İş Bankası"},{"code":"DHM","name":"DENİZ PORTFÖY ESG-S","qty":786.0,"unit_price":5.124598064040817,"market_value_try":4027.934078336082,"platform":"İş Bankası"},{"code":"DMG","name":"DENİZ PORTFÖY GÜMÜŞ","qty":6424.0,"unit_price":7.346075855040876,"market_value_try":47191.19129278259,"platform":"İş Bankası"},{"code":"IEV","name":"İŞ PORTFÖY TAŞIMACI","qty":538.0,"unit_price":4.751573618840155,"market_value_try":2556.3466069360034,"platform":"İş Bankası"},{"code":"GVI","name":"GARANTİ PORTFÖY ÜÇÜ","qty":822.0,"unit_price":5.39568163437179,"market_value_try":4435.250303453612,"platform":"İş Bankası"},{"code":"DVT","name":"DENİZ PORTFÖY METAV","qty":132.0,"unit_price":8.56796056022619,"market_value_try":1130.9707939498571,"platform":"İş Bankası"},{"code":"NHY","name":"NEO PORTFÖY BİRİNCİ","qty":57.0,"unit_price":5.522726,"market_value_try":314.79,"platform":"İş Bankası"},{"code":"RTG","name":"ATA PORTFÖY ROBOTİK","qty":401.0,"unit_price":5.166719200553178,"market_value_try":2071.8543994218244,"platform":"İş Bankası"},{"code":"CPU","name":"AKTİF PORTFÖY TEKNO","qty":228.0,"unit_price":3.308619223346385,"market_value_try":754.3651829229758,"platform":"İş Bankası"},{"code":"CPT","name":"ROTA PORTFÖY ÇİP TE","qty":719.0,"unit_price":3.487237774800767,"market_value_try":2507.3239600817515,"platform":"İş Bankası"},{"code":"GPT","name":"AKTİF PORTFÖY ROBOT","qty":439.0,"unit_price":2.5864251230772535,"market_value_try":1135.4406290309144,"platform":"İş Bankası"},{"code":"JET","name":"ATA PORTFÖY HAVACIL","qty":1183.0,"unit_price":2.19595907052801,"market_value_try":2597.8195804346356,"platform":"İş Bankası"},{"code":"KPH","name":"İŞ PORTFÖY KAR PAYI","qty":9008.0,"unit_price":1.331115,"market_value_try":11990.68,"platform":"İş Bankası"},{"code":"GID","name":"GARANTİ PORTFÖY İNŞ","qty":927.0,"unit_price":1.6723829602312361,"market_value_try":1550.299004134356,"platform":"İş Bankası"},{"code":"NPH","name":"NUROL PORTFÖY BİRİN","qty":839.0,"unit_price":1.71588,"market_value_try":1439.62,"platform":"İş Bankası"},{"code":"URA","name":"ATA PORTFÖY ENERJİ","qty":526.0,"unit_price":1.9424132087001957,"market_value_try":1021.7093477763029,"platform":"İş Bankası"},{"code":"BDS","name":"Pardus Portföy BIST","qty":420.0,"unit_price":2.4506190476190475,"market_value_try":1029.26,"platform":"Midas"},{"code":"KHA","name":"Pardus Portföy İkinc","qty":1085.0,"unit_price":3.2802857142857142,"market_value_try":3559.11,"platform":"Midas"}],"gold":[{"type":"Çeyrek Altın","qty":25,"total_gram":40.2,"cost_try":149824,"current_value_try":270600,"profit_try":120776,"profit_pct":0.806},{"type":"Bilezik","qty":2,"total_gram":18.32,"cost_try":109672,"current_value_try":121401,"profit_try":11729,"profit_pct":0.107}],"gold_total":{"type":"TOPLAM ALTIN","qty":27,"total_gram":58.52,"cost_try":259496,"current_value_try":392001,"profit_try":132505,"profit_pct":0.510624},"crypto_etf":[{"asset":"Bitcoin","type":"Kripto Para","qty":0.0102686,"avg_cost":2989018.72,"current_price":3451611.71,"currency":"TRY","total_value_try":35443.22,"profit_pct":0.15476416604151588},{"asset":"VOO","type":"ETF (S&P 500)","qty":0.83390021,"avg_cost":632.35,"current_price":660.5826,"currency":"USD","total_value_try":24631.704900000004,"profit_pct":0.04464109639309913}],"usd_try_rate":"44,715"},"MAYIS":{"report_date":"31.05.2026","sheet_name":"MAYIS","display_name":"Mayıs","summary":[{"category":"📈 Hisse Senetleri","value_try":354143.68,"pct":0.3434404886813795,"platform":"Midas","comment":"19 pozisyon, BIST","clean_name":"Hisse Senetleri","key":"hisse"},{"category":"📊 Yatırım Fonları","value_try":223854.25570237148,"pct":0.21708876739471658,"platform":"İş B./Midas","comment":"39 fon","clean_name":"Yatırım Fonları","key":"fon"},{"category":"🥇 Fiziki Altın","value_try":387156,"pct":0.3754550860146033,"platform":"Midas","comment":"Çeyrek (25) + Bilezik (2)","clean_name":"Fiziki Altın","key":"altin"},{"category":"🔗 Bitcoin","value_try":39745.29,"pct":0.038544078551347144,"platform":"Midas","comment":"0.0117092 BTC","clean_name":"Bitcoin","key":"bitcoin"},{"category":"🌐 VOO (S&P 500 ETF)","value_try":26265.391375000003,"pct":0.0254715793579535,"platform":"Midas","comment":"$695.49","clean_name":"VOO (S&P 500 ETF)","key":"voo"}],"total_try":1031164.6170773715,"stocks":[{"code":"EREGL","name":"Ereğli Demir ve Çeli","qty":522.0,"avg_cost":24.57,"pnl":7628.8,"market_value_try":20451.96,"price":39.18,"sector":"Metal","platform":"Midas","pct":0.01983384579075935},{"code":"TTRAK","name":"Türk Traktör ve Zira","qty":24.0,"avg_cost":529.17,"pnl":-1918.0,"market_value_try":10782.0,"price":449.25,"sector":"Tarım Mak.","platform":"Midas","pct":0.010456138449125038},{"code":"ENJSA","name":"Enerjisa Enerji","qty":163.0,"avg_cost":80.17,"pnl":4829.04,"market_value_try":17897.4,"price":109.80000000000001,"sector":"Enerji","platform":"Midas","pct":0.01735649158591824},{"code":"MAVI","name":"Mavi Giyim","qty":268.0,"avg_cost":37.7,"pnl":942.82,"market_value_try":11046.96,"price":41.22,"sector":"Perakende","platform":"Midas","pct":0.010713090632716223},{"code":"RYSAS","name":"Reysaş Taşımacılık v","qty":406.0,"avg_cost":15.58,"pnl":2687.97,"market_value_try":9013.2,"price":22.200000000000003,"sector":"Lojistik","platform":"Midas","pct":0.008740796426419385},{"code":"TUPRS","name":"Tüpraş - Türkiye Pet","qty":145.0,"avg_cost":195.1,"pnl":5959.82,"market_value_try":34249.0,"price":236.2,"sector":"Enerji","platform":"Midas","pct":0.03321390147876863},{"code":"AGESA","name":"Agesa Hayat Emeklili","qty":6.0,"avg_cost":237.73,"pnl":-42.8,"market_value_try":1383.6,"price":230.6,"sector":"Sigorta","platform":"Midas","pct":0.0013417838210173809},{"code":"AKSA","name":"Aksa Akrilik Kimya","qty":624.0,"avg_cost":10.15,"pnl":170.85,"market_value_try":6502.08,"price":10.42,"sector":"Kimya","platform":"Midas","pct":0.006305569345880813},{"code":"LOGO","name":"Logo Yazılım","qty":55.0,"avg_cost":145.18,"pnl":715.9,"market_value_try":8701.0,"price":158.2,"sector":"Teknoloji","platform":"Midas","pct":0.008438031964926446},{"code":"MGROS","name":"Migros Ticaret","qty":22.0,"avg_cost":582.43,"pnl":1684.6,"market_value_try":14498.0,"price":659.0,"sector":"Perakende","platform":"Midas","pct":0.014059830758246596},{"code":"SISE","name":"Türkiye Şişe ve Cam","qty":911.0,"avg_cost":41.47,"pnl":3945.64,"market_value_try":41723.8,"price":45.800000000000004,"sector":"Cam/Sanayi","platform":"Midas","pct":0.04046279256386601},{"code":"ENKAI","name":"Enka İnşaat","qty":304.0,"avg_cost":87.26,"pnl":4024.9,"market_value_try":30552.0,"price":100.5,"sector":"İnşaat","platform":"Midas","pct":0.029628634937643124},{"code":"ISMEN","name":"İş Yatırım Menkul De","qty":983.0,"avg_cost":38.68,"pnl":-590.53,"market_value_try":37432.64,"price":38.08,"sector":"Finans","platform":"Midas","pct":0.036301323164186224},{"code":"TABGD","name":"Tab Gıda San. ve Tic","qty":42.0,"avg_cost":229.41,"pnl":1578.8,"market_value_try":11214.0,"price":267.0,"sector":"Gıda","platform":"Midas","pct":0.010875082226719363},{"code":"CLEBI","name":"Çelebi Hava Servisi","qty":11.0,"avg_cost":1597.59,"pnl":653.56,"market_value_try":18227.0,"price":1657.0,"sector":"Havacılık","platform":"Midas","pct":0.0176761301717865},{"code":"RYGYO","name":"Reysaş Gayrimenkul Y","qty":1228.0,"avg_cost":22.31,"pnl":11258.36,"market_value_try":38657.44,"price":31.48,"sector":"GYO","platform":"Midas","pct":0.03748910635584717},{"code":"MPARK","name":"MLP Sağlık Hizmetler","qty":30.0,"avg_cost":450.63,"pnl":71.0,"market_value_try":13590.0,"price":453.0,"sector":"Sağlık","platform":"Midas","pct":0.013179273003488153},{"code":"GWIND","name":"Galata Wind Enerji","qty":924.0,"avg_cost":25.29,"pnl":1485.76,"market_value_try":24855.6,"price":26.9,"sector":"Enerji","platform":"Midas","pct":0.024104395736975724},{"code":"FROTO","name":"Ford Otomotiv","qty":40.0,"avg_cost":86.36,"pnl":-88.59,"market_value_try":3366.0,"price":84.15,"sector":"Otomotiv","platform":"Midas","pct":0.0032642702670891187}],"funds":[{"code":"KOCMT","name":"Eski","qty":0.285,"unit_price":2.62,"market_value_try":0.74,"platform":"İş Bankası"},{"code":"PATEK","name":"Eski","qty":0.82,"unit_price":23.78,"market_value_try":19.49,"platform":"İş Bankası"},{"code":"BINHO","name":"Eski","qty":0.35,"unit_price":9.06,"market_value_try":3.17,"platform":"İş Bankası"},{"code":"TGE","name":"İş Emtia Yabancı BY","qty":1744.0,"unit_price":0.29119697510969283,"market_value_try":507.8475245913043,"platform":"İş Bankası"},{"code":"TTA","name":"İş Altın Fonu","qty":3873.0,"unit_price":0.6180468040547773,"market_value_try":2393.6952721041525,"platform":"İş Bankası"},{"code":"YTD","name":"YAPI KREDİ PORTFÖY","qty":1747.0,"unit_price":0.9074203860811455,"market_value_try":1585.2634144837612,"platform":"İş Bankası"},{"code":"TCD","name":"TACİRLER PORTFÖY DE","qty":36.0,"unit_price":45.751137258956085,"market_value_try":1647.040941322419,"platform":"İş Bankası"},{"code":"AN1","name":"STRATEJİ PORTFÖY Bİ","qty":15.0,"unit_price":101.25821078079102,"market_value_try":1518.8731617118654,"platform":"İş Bankası"},{"code":"GBG","name":"INVEO PORTFÖY G-20","qty":1913.0,"unit_price":0.5637236746275945,"market_value_try":1078.4033895625882,"platform":"İş Bankası"},{"code":"DBH","name":"DENİZ PORTFÖY EUROB","qty":37300.0,"unit_price":0.35708427487579697,"market_value_try":13319.243452867227,"platform":"İş Bankası"},{"code":"IPV","name":"İŞ PORTFÖY EUROBOND","qty":11.0,"unit_price":73.62987563764673,"market_value_try":809.9286320141141,"platform":"İş Bankası"},{"code":"ZDZ","name":"ZİRAAT PORTFÖY AGRE","qty":25.0,"unit_price":12.380727094492737,"market_value_try":309.51817736231845,"platform":"İş Bankası"},{"code":"MKG","name":"AKTİF PORTFÖY ALTIN","qty":1501.0,"unit_price":17.351989458613325,"market_value_try":26045.336177378602,"platform":"İş Bankası"},{"code":"YZG","name":"YAPI KREDİ PORTFÖY","qty":3020.0,"unit_price":15.152931654663917,"market_value_try":45761.85359708503,"platform":"İş Bankası"},{"code":"ITP","name":"İŞ PORTFÖY TEKNOLOJ","qty":97.0,"unit_price":12.382026274278816,"market_value_try":1201.0565486050452,"platform":"İş Bankası"},{"code":"OJT","name":"QNB PORTFÖY TEKNOLO","qty":2397.0,"unit_price":12.645593507804543,"market_value_try":30311.48763820749,"platform":"İş Bankası"},{"code":"GJB","name":"INVEO PORTFÖY BİRİN","qty":581.0,"unit_price":10.497202069345898,"market_value_try":6098.874402289966,"platform":"İş Bankası"},{"code":"IJC","name":"İŞ PORTFÖY YARI İLE","qty":151.0,"unit_price":17.996344686174716,"market_value_try":2717.448047612382,"platform":"İş Bankası"},{"code":"ZFB","name":"AK PORTFÖY FİNTEK V","qty":173.0,"unit_price":7.347879170992381,"market_value_try":1271.1830965816819,"platform":"İş Bankası"},{"code":"YJK","name":"YAPI KREDİ PORTFÖY","qty":322.0,"unit_price":5.722710462024789,"market_value_try":1842.7127687719822,"platform":"İş Bankası"},{"code":"OLD","name":"QNB PORTFÖY TEMİZ E","qty":292.0,"unit_price":3.2456153818631477,"market_value_try":947.7196915040391,"platform":"İş Bankası"},{"code":"DHM","name":"DENİZ PORTFÖY ESG-S","qty":786.0,"unit_price":5.163888357397818,"market_value_try":4058.816248914685,"platform":"İş Bankası"},{"code":"DMG","name":"DENİZ PORTFÖY GÜMÜŞ","qty":6424.0,"unit_price":7.76445691321302,"market_value_try":49878.871210480436,"platform":"İş Bankası"},{"code":"IEV","name":"İŞ PORTFÖY TAŞIMACI","qty":538.0,"unit_price":4.834764169758809,"market_value_try":2601.103123330239,"platform":"İş Bankası"},{"code":"GVI","name":"GARANTİ PORTFÖY ÜÇÜ","qty":822.0,"unit_price":5.334564748499261,"market_value_try":4385.0122232663925,"platform":"İş Bankası"},{"code":"DVT","name":"DENİZ PORTFÖY METAV","qty":132.0,"unit_price":9.700722057933135,"market_value_try":1280.4953116471738,"platform":"İş Bankası"},{"code":"RTG","name":"ATA PORTFÖY ROBOTİK","qty":401.0,"unit_price":5.7832328024399855,"market_value_try":2319.076353778434,"platform":"İş Bankası"},{"code":"CPU","name":"AKTİF PORTFÖY TEKNO","qty":228.0,"unit_price":3.8041577416654198,"market_value_try":867.3479650997157,"platform":"İş Bankası"},{"code":"CPT","name":"ROTA PORTFÖY ÇİP TE","qty":719.0,"unit_price":3.873355202940032,"market_value_try":2784.942390913883,"platform":"İş Bankası"},{"code":"GPT","name":"AKTİF PORTFÖY ROBOT","qty":439.0,"unit_price":2.894028662964831,"market_value_try":1270.4785830415608,"platform":"İş Bankası"},{"code":"JET","name":"ATA PORTFÖY HAVACIL","qty":1183.0,"unit_price":2.2060187590300986,"market_value_try":2609.7201919326067,"platform":"İş Bankası"},{"code":"GID","name":"GARANTİ PORTFÖY İNŞ","qty":927.0,"unit_price":1.6529983693391959,"market_value_try":1532.3294883774345,"platform":"İş Bankası"},{"code":"URA","name":"ATA PORTFÖY ENERJİ","qty":526.0,"unit_price":1.9220392365541394,"market_value_try":1010.9926384274773,"platform":"İş Bankası"},{"code":"BDS","name":"Pardus Portföy BIST","qty":420.0,"unit_price":2.3840714285714286,"market_value_try":1001.31,"platform":"Midas"},{"code":"KHA","name":"Pardus Portföy İkinc","qty":1085.0,"unit_price":3.2439907834101382,"market_value_try":3519.73,"platform":"Midas"},{"code":"GO9","name":"One Portföy Birinci","qty":777.0,"unit_price":2.5294851994851997,"market_value_try":1965.41,"platform":"Midas"},{"code":"HVS","name":"Hsbc Portföy Hisse S","qty":637.0,"unit_price":1.5559704617169594,"market_value_try":991.1531841137031,"platform":"Midas"},{"code":"OPH","name":"Osmanlı Portföy Biri","qty":41.0,"unit_price":25.08817384137148,"market_value_try":1028.6151274962306,"platform":"Midas"},{"code":"MAC","name":"Marmara Capital Port","qty":1693.0,"unit_price":0.8021061591822376,"market_value_try":1357.9657274955282,"platform":"Midas"}],"gold":[{"type":"Çeyrek Altın","qty":25,"total_gram":40.2,"cost_try":149824,"current_value_try":266900,"profit_try":117076,"profit_pct":0.781423536950021},{"type":"Bilezik","qty":2,"total_gram":18.32,"cost_try":109672,"current_value_try":120256,"profit_try":10584,"profit_pct":0.0965059449996353}],"gold_total":{"type":"TOPLAM ALTIN","qty":27,"total_gram":58.52,"cost_try":259496,"current_value_try":387156,"profit_try":127660,"profit_pct":0.491953633196658},"crypto_etf":[{"asset":"Bitcoin","type":"Kripto Para","qty":0.0117092,"avg_cost":3051289.09,"current_price":3394364.26,"currency":"TRY","total_value_try":39745.29,"profit_pct":0.11243614107420531},{"asset":"VOO","type":"ETF (S&P 500)","qty":0.83390021,"avg_cost":632.35,"current_price":695.4909,"currency":"USD","total_value_try":26265.391375000003,"profit_pct":0.09984510302024932}],"usd_try_rate":"45,2875"},"HAZİRAN":{"report_date":"30.06.2026","sheet_name":"HAZİRAN","display_name":"Haziran","summary":[{"category":"📈 Hisse Senetleri","value_try":406503.84,"pct":0.3797489223528835,"platform":"Midas","comment":"19 pozisyon, BIST","clean_name":"Hisse Senetleri","key":"hisse"},{"category":"📊 Yatırım Fonları","value_try":214817.89028746152,"pct":0.20067919244940827,"platform":"İş B./Midas","comment":"38 fon","clean_name":"Yatırım Fonları","key":"fon"},{"category":"🥇 Fiziki Altın","value_try":363993,"pct":0.34003602399916594,"platform":"Midas","comment":"Çeyrek (25) + Bilezik (2)","clean_name":"Fiziki Altın","key":"altin"},{"category":"🔗 Bitcoin","value_try":58622.1,"pct":0.05476376139783322,"platform":"Midas","comment":"0.0205038 BTC","clean_name":"Bitcoin","key":"bitcoin"},{"category":"🌐 VOO (S&P 500 ETF)","value_try":26517.398999999998,"pct":0.024772099800708967,"platform":"Midas","comment":"$686.81","clean_name":"VOO (S&P 500 ETF)","key":"voo"}],"total_try":1070454.2292874616,"stocks":[{"code":"TTRAK","name":"Türk Traktör ve Zira","qty":24.0,"avg_cost":529.17,"pnl":-2176.0,"market_value_try":10524.0,"price":438.5,"sector":"Tarım Mak.","platform":"Midas","pct":0.009831340483380786},{"code":"RYSAS","name":"Reysaş Taşımacılık v","qty":406.0,"avg_cost":15.58,"pnl":2582.41,"market_value_try":8907.64,"price":21.939999999999998,"sector":"Lojistik","platform":"Midas","pct":0.00832136466584778},{"code":"AGESA","name":"Agesa Hayat Emeklili","qty":6.0,"avg_cost":237.73,"pnl":75.1,"market_value_try":1501.5,"price":250.25,"sector":"Sigorta","platform":"Midas","pct":0.0014026755735268197},{"code":"FROTO","name":"Ford Otomotiv","qty":40.0,"avg_cost":86.36,"pnl":-72.59,"market_value_try":3382.0,"price":84.55,"sector":"Otomotiv","platform":"Midas","pct":0.0031594064533251444},{"code":"EREGL","name":"Ereğli Demir ve Çeli","qty":522.0,"avg_cost":24.24,"pnl":8479.37,"market_value_try":21130.56,"price":40.480000000000004,"sector":"Metal","platform":"Midas","pct":0.01973980710419106},{"code":"SISE","name":"Türkiye Şişe ve Cam","qty":931.0,"avg_cost":41.01,"pnl":3067.29,"market_value_try":41243.3,"price":44.300000000000004,"sector":"Cam/Sanayi","platform":"Midas","pct":0.03852878420355557},{"code":"ENJSA","name":"Enerjisa Enerji","qty":173.0,"avg_cost":81.58,"pnl":3601.84,"market_value_try":17715.2,"price":102.4,"sector":"Enerji","platform":"Midas","pct":0.016549236310451094},{"code":"CLEBI","name":"Çelebi Hava Servisi","qty":12.0,"avg_cost":1599.2,"pnl":-194.44,"market_value_try":18996.0,"price":1583.0,"sector":"Havacılık","platform":"Midas","pct":0.017745737725418226},{"code":"AKSA","name":"Aksa Akrilik Kimya","qty":724.0,"avg_cost":10.23,"pnl":1351.17,"market_value_try":8760.4,"price":12.1,"sector":"Kimya","platform":"Midas","pct":0.0081838155806356},{"code":"ISMEN","name":"İş Yatırım Menkul De","qty":1033.0,"avg_cost":38.57,"pnl":-2548.27,"market_value_try":37291.3,"price":36.1,"sector":"Finans","platform":"Midas","pct":0.03483689351652394},{"code":"GWIND","name":"Galata Wind Enerji","qty":1004.0,"avg_cost":25.39,"pnl":94.48,"market_value_try":25581.92,"price":25.479999999999997,"sector":"Enerji","platform":"Midas","pct":0.023898191347264213},{"code":"MAVI","name":"Mavi Giyim","qty":368.0,"avg_cost":39.1,"pnl":-535.72,"market_value_try":13851.52,"price":37.64,"sector":"Perakende","platform":"Midas","pct":0.012939852654157985},{"code":"LOGO","name":"Logo Yazılım","qty":71.0,"avg_cost":140.73,"pnl":-236.5,"market_value_try":9755.4,"price":137.4,"sector":"Teknoloji","platform":"Midas","pct":0.009113327532456568},{"code":"MGROS","name":"Migros Ticaret","qty":23.0,"avg_cost":586.78,"pnl":1902.6,"market_value_try":15398.5,"price":669.5,"sector":"Perakende","platform":"Midas","pct":0.014385014864437384},{"code":"ENKAI","name":"Enka İnşaat","qty":409.0,"avg_cost":88.87,"pnl":666.65,"market_value_try":37014.5,"price":90.5,"sector":"İnşaat","platform":"Midas","pct":0.034578311699173137},{"code":"TUPRS","name":"Tüpraş - Türkiye Pet","qty":227.0,"avg_cost":207.52,"pnl":4535.02,"market_value_try":51642.5,"price":227.5,"sector":"Enerji","platform":"Midas","pct":0.048243538665240615},{"code":"RYGYO","name":"Reysaş Gayrimenkul Y","qty":1470.0,"avg_cost":23.9,"pnl":8818.46,"market_value_try":43953.0,"price":29.9,"sector":"GYO","platform":"Midas","pct":0.041060139515966904},{"code":"TABGD","name":"Tab Gıda San. ve Tic","qty":87.0,"avg_cost":240.02,"pnl":-1237.29,"market_value_try":19644.6,"price":225.79999999999998,"sector":"Gıda","platform":"Midas","pct":0.018351648732404236},{"code":"MPARK","name":"MLP Sağlık Hizmetler","qty":47.0,"avg_cost":444.9,"pnl":-700.5,"market_value_try":20210.0,"price":430.0,"sector":"Sağlık","platform":"Midas","pct":0.018879835724926426}],"funds":[{"code":"KOCMT","name":"Eski","qty":0.285,"unit_price":3.68,"market_value_try":1.04,"platform":"İş Bankası"},{"code":"PATEK","name":"Eski","qty":0.82,"unit_price":22.54,"market_value_try":18.48,"platform":"İş Bankası"},{"code":"BINHO","name":"Eski","qty":0.35,"unit_price":10.98,"market_value_try":3.84,"platform":"İş Bankası"},{"code":"TGE","name":"İş Emtia Yabancı BY","qty":1744.0,"unit_price":0.26500206001672527,"market_value_try":462.16359266916885,"platform":"İş Bankası"},{"code":"TTA","name":"İş Altın Fonu","qty":3873.0,"unit_price":0.5660820468166556,"market_value_try":2192.4357673209074,"platform":"İş Bankası"},{"code":"YTD","name":"YAPI KREDİ PORTFÖY","qty":1747.0,"unit_price":0.9516707412083926,"market_value_try":1662.5687848910618,"platform":"İş Bankası"},{"code":"TCD","name":"TACİRLER PORTFÖY DE","qty":36.0,"unit_price":47.62766590476942,"market_value_try":1714.5959725716991,"platform":"İş Bankası"},{"code":"AN1","name":"STRATEJİ PORTFÖY Bİ","qty":15.0,"unit_price":107.85305679073315,"market_value_try":1617.7958518609971,"platform":"İş Bankası"},{"code":"GBG","name":"INVEO PORTFÖY G-20","qty":1913.0,"unit_price":0.5880269296881394,"market_value_try":1124.8955164934107,"platform":"İş Bankası"},{"code":"DBH","name":"DENİZ PORTFÖY EUROB","qty":37300.0,"unit_price":0.37167438126294716,"market_value_try":13863.454421107928,"platform":"İş Bankası"},{"code":"IPV","name":"İŞ PORTFÖY EUROBOND","qty":11.0,"unit_price":75.61228640931473,"market_value_try":831.735150502462,"platform":"İş Bankası"},{"code":"ZDZ","name":"ZİRAAT PORTFÖY AGRE","qty":25.0,"unit_price":12.49867828152197,"market_value_try":312.46695703804926,"platform":"İş Bankası"},{"code":"MKG","name":"AKTİF PORTFÖY ALTIN","qty":1501.0,"unit_price":15.869400775290485,"market_value_try":23819.970563711016,"platform":"İş Bankası"},{"code":"YZG","name":"YAPI KREDİ PORTFÖY","qty":3020.0,"unit_price":11.676106639432936,"market_value_try":35261.842051087464,"platform":"İş Bankası"},{"code":"ITP","name":"İŞ PORTFÖY TEKNOLOJ","qty":97.0,"unit_price":12.732549056077374,"market_value_try":1235.0572584395054,"platform":"İş Bankası"},{"code":"OJT","name":"QNB PORTFÖY TEKNOLO","qty":2397.0,"unit_price":12.807988219631769,"market_value_try":30700.74776245735,"platform":"İş Bankası"},{"code":"GJB","name":"INVEO PORTFÖY BİRİN","qty":581.0,"unit_price":10.593702847969395,"market_value_try":6154.941354670218,"platform":"İş Bankası"},{"code":"IJC","name":"İŞ PORTFÖY YARI İLE","qty":151.0,"unit_price":17.768079050175274,"market_value_try":2682.9799365764666,"platform":"İş Bankası"},{"code":"ZFB","name":"AK PORTFÖY FİNTEK V","qty":173.0,"unit_price":7.156657963446475,"market_value_try":1238.1018276762402,"platform":"İş Bankası"},{"code":"YJK","name":"YAPI KREDİ PORTFÖY","qty":322.0,"unit_price":5.873698454854851,"market_value_try":1891.330902463262,"platform":"İş Bankası"},{"code":"OLD","name":"QNB PORTFÖY TEMİZ E","qty":292.0,"unit_price":3.2372254661010316,"market_value_try":945.2698361015013,"platform":"İş Bankası"},{"code":"DHM","name":"DENİZ PORTFÖY ESG-S","qty":786.0,"unit_price":5.22520436775356,"market_value_try":4107.010633054298,"platform":"İş Bankası"},{"code":"DMG","name":"DENİZ PORTFÖY GÜMÜŞ","qty":6424.0,"unit_price":6.08311035539822,"market_value_try":39077.90092307817,"platform":"İş Bankası"},{"code":"IEV","name":"İŞ PORTFÖY HAVACILI","qty":538.0,"unit_price":5.204522098697792,"market_value_try":2800.032889099412,"platform":"İş Bankası"},{"code":"GVI","name":"GARANTİ PORTFÖY ÜÇÜ","qty":822.0,"unit_price":5.485516927187545,"market_value_try":4509.094914148162,"platform":"İş Bankası"},{"code":"DVT","name":"DENİZ PORTFÖY METAV","qty":132.0,"unit_price":9.689081191463615,"market_value_try":1278.9587172731972,"platform":"İş Bankası"},{"code":"RTG","name":"ATA PORTFÖY ROBOTİK","qty":401.0,"unit_price":6.093451193195669,"market_value_try":2443.4739284714633,"platform":"İş Bankası"},{"code":"CPU","name":"AKTİF PORTFÖY TEKNO","qty":228.0,"unit_price":3.9112257613045935,"market_value_try":891.7594735774474,"platform":"İş Bankası"},{"code":"CPT","name":"ROTA PORTFÖY ÇİP TE","qty":719.0,"unit_price":4.1696087756369,"market_value_try":2997.948709682931,"platform":"İş Bankası"},{"code":"GPT","name":"AKTİF PORTFÖY ROBOT","qty":439.0,"unit_price":2.965953957325496,"market_value_try":1302.0537872658929,"platform":"İş Bankası"},{"code":"JET","name":"ATA PORTFÖY HAVACIL","qty":1183.0,"unit_price":2.243123994556985,"market_value_try":2653.6156855609133,"platform":"İş Bankası"},{"code":"GID","name":"GARANTİ PORTFÖY İNŞ","qty":927.0,"unit_price":1.6738922687276432,"market_value_try":1551.6981331105253,"platform":"İş Bankası"},{"code":"URA","name":"ATA PORTFÖY ENERJİ","qty":526.0,"unit_price":1.7888976565987977,"market_value_try":940.9601673709676,"platform":"İş Bankası"},{"code":"GO9","name":"One Portföy Birinci","qty":777.0,"unit_price":2.570759330759331,"market_value_try":1997.48,"platform":"Midas"},{"code":"HVS","name":"Hsbc Portföy Hisse S","qty":1282.0,"unit_price":1.599224884582229,"market_value_try":2050.2063020344176,"platform":"Midas"},{"code":"KHA","name":"Pardus Portföy İkinc","qty":1279.0,"unit_price":3.600375293197811,"market_value_try":4604.88,"platform":"Midas"},{"code":"OPH","name":"Osmanlı Portföy Biri","qty":221.0,"unit_price":25.291814548441888,"market_value_try":5589.491015205657,"platform":"Midas"},{"code":"MAC","name":"Marmara Capital Port","qty":10336.0,"unit_price":0.8016264996990466,"market_value_try":8285.611500889347,"platform":"Midas"}],"gold":[{"type":"Çeyrek Altın","qty":25,"total_gram":40.2,"cost_try":149824,"current_value_try":251750,"profit_try":101926,"profit_pct":0.680304891072191},{"type":"Bilezik","qty":2,"total_gram":18.32,"cost_try":109672,"current_value_try":112243,"profit_try":2571,"profit_pct":0.0234426289299001}],"gold_total":{"type":"TOPLAM ALTIN","qty":27,"total_gram":58.52,"cost_try":259496,"current_value_try":363993,"profit_try":104497,"profit_pct":0.402692141690045},"crypto_etf":[{"asset":"Bitcoin","type":"Kripto","qty":0.0205038,"avg_cost":"—","current_price":2859085,"currency":"TRY","total_value_try":58622.1,"profit_pct":null},{"asset":"VOO","type":"ETF (S&P 500)","qty":0.83390021,"avg_cost":632.35,"current_price":686.8088,"currency":"USD","total_value_try":26517.398999999998,"profit_pct":0.0861152161092027}],"usd_try_rate":"46,3"},"TEMMUZ":{"report_date":"31.07.2026","sheet_name":"TEMMUZ","display_name":"Temmuz","summary":[{"category":"📈 Hisse Senetleri","value_try":485118.69,"pct":0.4239490394996715,"platform":"Midas","comment":"18 pozisyon, BIST","clean_name":"Hisse Senetleri","key":"hisse"},{"category":"📊 Yatırım Fonları","value_try":212823.746873,"pct":0.1859883466240593,"platform":"İş B./Midas","comment":"35 fon","clean_name":"Yatırım Fonları","key":"fon"},{"category":"🥇 Fiziki Altın","value_try":357887,"pct":0.312760264708455,"platform":"Midas","comment":"Çeyrek (25) + Bilezik (2)","clean_name":"Fiziki Altın","key":"altin"},{"category":"🔗 Bitcoin","value_try":61183.27,"pct":0.053468540966642754,"platform":"Midas","comment":"0.0205038 BTC","clean_name":"Bitcoin","key":"bitcoin"},{"category":"🌐 VOO (S&P 500 ETF)","value_try":27272.6784,"pct":0.02383380820117122,"platform":"Midas","comment":"$686.65","clean_name":"VOO (S&P 500 ETF)","key":"voo"}],"total_try":1144285.3852730002,"stocks":[{"code":"AGESA","name":"Agesa Hayat Emeklili","qty":6.0,"avg_cost":237.73,"pnl":31.0,"market_value_try":1457.4,"price":242.9,"sector":"Sigorta","platform":"Midas","pct":0.001273633325005106},{"code":"FROTO","name":"Ford Otomotiv","qty":40.0,"avg_cost":86.36,"pnl":-250.59,"market_value_try":3204.0,"price":80.1,"sector":"Otomotiv","platform":"Midas","pct":0.0028000008050750374},{"code":"EREGL","name":"Ereğli Demir ve Çeli","qty":522.0,"avg_cost":24.24,"pnl":9554.69,"market_value_try":22205.88,"price":42.54,"sector":"Metal","platform":"Midas","pct":0.019405893220162194},{"code":"ENJSA","name":"Enerjisa Enerji","qty":173.0,"avg_cost":81.58,"pnl":4726.34,"market_value_try":18839.7,"price":108.9,"sector":"Enerji","platform":"Midas","pct":0.016464162037257236},{"code":"AKSA","name":"Aksa Akrilik Kimya","qty":724.0,"avg_cost":10.23,"pnl":2002.77,"market_value_try":9412.0,"price":13.0,"sector":"Kimya","platform":"Midas","pct":0.00822522084187461},{"code":"LOGO","name":"Logo Yazılım","qty":71.0,"avg_cost":140.73,"pnl":-335.9,"market_value_try":9656.0,"price":136.0,"sector":"Teknoloji","platform":"Midas","pct":0.008438454361362223},{"code":"TUPRS","name":"Tüpraş - Türkiye Pet","qty":227.0,"avg_cost":207.52,"pnl":19914.27,"market_value_try":67021.75,"price":295.25,"sector":"Enerji","platform":"Midas","pct":0.05857083456851994},{"code":"MGROS","name":"Migros Ticaret","qty":25.0,"avg_cost":590.56,"pnl":873.6,"market_value_try":15637.5,"price":625.5,"sector":"Perakende","platform":"Midas","pct":0.013665734266342353},{"code":"TABGD","name":"Tab Gıda San. ve Tic","qty":112.0,"avg_cost":236.28,"pnl":763.31,"market_value_try":27227.2,"price":243.1,"sector":"Gıda","platform":"Midas","pct":0.0237940642696439},{"code":"RYSAS","name":"Reysaş Taşımacılık v","qty":407.0,"avg_cost":15.59,"pnl":2689.13,"market_value_try":9035.4,"price":22.2,"sector":"Lojistik","platform":"Midas","pct":0.007896107139255615},{"code":"MAVI","name":"Mavi Giyim","qty":488.0,"avg_cost":39.21,"pnl":-43.28,"market_value_try":19090.56,"price":39.120000000000005,"sector":"Perakende","platform":"Midas","pct":0.01668339056471077},{"code":"RYGYO","name":"Reysaş Gayrimenkul Y","qty":1656.0,"avg_cost":24.74,"pnl":22449.22,"market_value_try":63424.8,"price":38.300000000000004,"sector":"GYO","platform":"Midas","pct":0.055427431667204506},{"code":"MPARK","name":"MLP Sağlık Hizmetler","qty":67.0,"avg_cost":433.63,"pnl":-1918.0,"market_value_try":27135.0,"price":405.0,"sector":"Sağlık","platform":"Midas","pct":0.02371348996432932},{"code":"SISE","name":"Türkiye Şişe ve Cam","qty":951.0,"avg_cost":41.02,"pnl":682.33,"market_value_try":39694.74,"price":41.739999999999995,"sector":"Cam/Sanayi","platform":"Midas","pct":0.03468954555469547},{"code":"ENKAI","name":"Enka İnşaat","qty":494.0,"avg_cost":88.89,"pnl":-635.2,"market_value_try":43274.4,"price":87.60000000000001,"sector":"İnşaat","platform":"Midas","pct":0.037817838588994755},{"code":"ISMEN","name":"İş Yatırım Menkul De","qty":1103.0,"avg_cost":38.32,"pnl":-4167.55,"market_value_try":38097.62,"price":34.54,"sector":"Finans","platform":"Midas","pct":0.033293809822547704},{"code":"GWIND","name":"Galata Wind Enerji","qty":1249.0,"avg_cost":25.24,"pnl":-1224.9,"market_value_try":30300.74,"price":24.26,"sector":"Enerji","platform":"Midas","pct":0.026480055054422406},{"code":"CLEBI","name":"Çelebi Hava Servisi","qty":28.0,"avg_cost":1540.91,"pnl":-2741.44,"market_value_try":40404.0,"price":1443.0,"sector":"Havacılık","platform":"Midas","pct":0.03530937344826836}],"funds":[{"code":"HVS","name":"HSBC Hisse Senedi (TL) Fonu","qty":1282,"unit_price":1.534202,"market_value_try":1966.846964,"pct":0.00763571189081637,"platform":"Midas"},{"code":"MAC","name":"Marmara Capital Hisse Senedi (TL)","qty":12974,"unit_price":0.771119,"market_value_try":10004.497906,"pct":0.0388395564173094,"platform":"Midas"},{"code":"GO9","name":"One Portföy Birinci Hisse (TL)","qty":777,"unit_price":2.657074,"market_value_try":2064.546498,"pct":0.00801500194598867,"platform":"Midas"},{"code":"OPH","name":"Osmanlı Portföy Birinci Hisse","qty":221,"unit_price":25.091124,"market_value_try":5545.138404,"pct":0.0215273887712828,"platform":"Midas"},{"code":"KHA","name":"Pardus İkinci Hisse (TL)","qty":1279,"unit_price":3.989608,"market_value_try":5102.708632,"pct":0.0198097837248581,"platform":"Midas"},{"code":"ZFB","name":"Ak Portföy Fintek ve Blokzinciri Değ.","qty":173,"unit_price":7.027924,"market_value_try":1215.8308519999998,"pct":0.00472011003589083,"platform":"İş Bankası"},{"code":"MKG","name":"Aktif Portföy Altın Katılım Fonu","qty":1501,"unit_price":16.158208,"market_value_try":24253.470208,"pct":0.0941570514892313,"platform":"İş Bankası"},{"code":"GPT","name":"Aktif Portföy Robotik Tekn. Değ.","qty":439,"unit_price":2.694584,"market_value_try":1182.922376,"pct":0.004592352439036,"platform":"İş Bankası"},{"code":"CPU","name":"Aktif Portföy Teknoloji Katılım","qty":228,"unit_price":3.644179,"market_value_try":830.872812,"pct":0.00322562229114254,"platform":"İş Bankası"},{"code":"URA","name":"Ata Portföy Enerji Değ.","qty":526,"unit_price":1.722941,"market_value_try":906.266966,"pct":0.00351831818906083,"platform":"İş Bankası"},{"code":"JET","name":"Ata Portföy Havacılık & Savunma Değ.","qty":1183,"unit_price":2.24353,"market_value_try":2654.09599,"pct":0.01030375656121,"platform":"İş Bankası"},{"code":"RTG","name":"Ata Portföy Robotik Tekn. Değ.","qty":401,"unit_price":5.398944,"market_value_try":2164.976544,"pct":0.00840489242067912,"platform":"İş Bankası"},{"code":"DMG","name":"Deniz Portföy Gümüş Fon Sepeti","qty":6424,"unit_price":6.024603,"market_value_try":38702.049672,"pct":0.150249463373835,"platform":"İş Bankası"},{"code":"DVT","name":"Deniz Portföy Metaverse Değ.","qty":132,"unit_price":9.223734,"market_value_try":1217.532888,"pct":0.00472671769615198,"platform":"İş Bankası"},{"code":"DBH","name":"Deniz Portföy Eurobond (Döviz)","qty":37300,"unit_price":0.374986,"market_value_try":13986.977799999999,"pct":0.0543003775376825,"platform":"İş Bankası"},{"code":"DHM","name":"Deniz Portföy ESG Sürdürülebilirlik","qty":786,"unit_price":5.109696,"market_value_try":4016.221056,"pct":0.0155918113786947,"platform":"İş Bankası"},{"code":"GVI","name":"Garanti Portföy Üçüncü Fon Sepeti","qty":822,"unit_price":5.346108,"market_value_try":4394.500776,"pct":0.0170603724863593,"platform":"İş Bankası"},{"code":"GID","name":"Garanti Portföy İnşaat Sektörü Değ.","qty":927,"unit_price":1.60271,"market_value_try":1485.71217,"pct":0.00576784584181792,"platform":"İş Bankası"},{"code":"GBG","name":"Inveo G-20 Ülkeleri Yabancı Hisse","qty":1913,"unit_price":0.574714,"market_value_try":1099.427882,"pct":0.00426820932453719,"platform":"İş Bankası"},{"code":"GJB","name":"Inveo Gedik Portföy Birinci Fon Sepeti","qty":581,"unit_price":9.990847,"market_value_try":5804.6821070000005,"pct":0.0225349917904589,"platform":"İş Bankası"},{"code":"OJT","name":"QNB Portföy Teknoloji Fon Sepeti","qty":2397,"unit_price":12.1509,"market_value_try":29125.707300000002,"pct":0.113072096421147,"platform":"İş Bankası"},{"code":"OLD","name":"QNB Portföy Temiz Enerji ve Su Fon Sep.","qty":292,"unit_price":3.101958,"market_value_try":905.771736,"pct":0.00351639560246976,"platform":"İş Bankası"},{"code":"CPT","name":"Rota Portföy Çip Tekn. Değ.","qty":719,"unit_price":3.660437,"market_value_try":2631.854203,"pct":0.0102174092853023,"platform":"İş Bankası"},{"code":"AN1","name":"Strateji Portföy Birinci Değ.","qty":15,"unit_price":108.322649,"market_value_try":1624.839735,"pct":0.0063079681908645,"platform":"İş Bankası"},{"code":"TCD","name":"Tacirler Portföy Değişken Fon","qty":36,"unit_price":45.862918,"market_value_try":1651.065048,"pct":0.00640978034909528,"platform":"İş Bankası"},{"code":"YZG","name":"Yapı Kredi Portföy Gümüş Fon Sep.","qty":3020,"unit_price":11.570181,"market_value_try":34941.94662,"pct":0.13565195573325,"platform":"İş Bankası"},{"code":"YJK","name":"Yapı Kredi Robotik & Yarı İletken Fon","qty":322,"unit_price":5.343233,"market_value_try":1720.521026,"pct":0.0066794230039688,"platform":"İş Bankası"},{"code":"YTD","name":"Yapı Kredi Yabancı Fon Sepeti","qty":1747,"unit_price":0.885601,"market_value_try":1547.144947,"pct":0.00600634074986648,"platform":"İş Bankası"},{"code":"ZDZ","name":"Ziraat Portföy Agresif Değ.","qty":25,"unit_price":12.2933,"market_value_try":307.3325,"pct":0.00119312913899097,"platform":"İş Bankası"},{"code":"IEV","name":"İş Portföy Taşımacılık Değ.","qty":538,"unit_price":5.120162,"market_value_try":2754.647156,"pct":0.0106941172491103,"platform":"İş Bankası"},{"code":"ITP","name":"İş Portföy Teknoloji Karma Fon","qty":97,"unit_price":12.322179,"market_value_try":1195.251363,"pct":0.00464021614900466,"platform":"İş Bankası"},{"code":"IJC","name":"İş Portföy Yarı İletken Tekn. Değ.","qty":151,"unit_price":14.881548,"market_value_try":2247.113748,"pct":0.00872376625109942,"platform":"İş Bankası"},{"code":"IPV","name":"İş Portföy Eurobond (Döviz)","qty":11,"unit_price":76.836903,"market_value_try":845.2059330000001,"pct":0.00328126646908592,"platform":"İş Bankası"},{"code":"TGE","name":"İş Portföy Emtia Yabancı BYF Fon Sep.","qty":1744,"unit_price":0.28108,"market_value_try":490.20351999999997,"pct":0.00190307274286951,"platform":"İş Bankası"},{"code":"TTA","name":"İş Portföy Altın Fonu","qty":3873,"unit_price":0.577295,"market_value_try":2235.863535,"pct":0.00868009056775921,"platform":"İş Bankası"}],"gold":[{"type":"Çeyrek Altın","qty":25,"total_gram":40.2,"cost_try":149824,"current_value_try":246475,"profit_try":96651,"profit_pct":0.645096913712089},{"type":"Bilezik","qty":2,"total_gram":18.32,"cost_try":109672,"current_value_try":111412,"profit_try":1740,"profit_pct":0.0158654898242031}],"gold_total":{"type":"TOPLAM ALTIN","qty":27,"total_gram":58.52,"cost_try":259496,"current_value_try":357887,"profit_try":98391,"profit_pct":0.379161913863798},"crypto_etf":[{"asset":"Bitcoin","type":"Kripto Para","qty":0.0205038,"avg_cost":3045919.78,"current_price":2983996.63,"currency":"TRY","total_value_try":61183.27,"profit_pct":-0.02032987059959577},{"asset":"VOO","type":"ETF (S&P 500)","qty":0.835828343,"avg_cost":632.47,"current_price":686.6482,"currency":"USD","total_value_try":27272.6784,"profit_pct":0.08565434408807654}],"usd_try_rate":"47,52"},"AĞUSTOS":{"report_date":"31.08.2026","sheet_name":"AĞUSTOS","display_name":"Ağustos","summary":[{"category":"📈 Hisse Senetleri","value_try":583419.23,"pct":0.438172317095841,"platform":"Midas","comment":"19 pozisyon, BIST","clean_name":"Hisse Senetleri","key":"hisse"},{"category":"📊 Yatırım Fonları","value_try":250529.63,"pct":0.18815826224696727,"platform":"İş B./Midas","comment":"39 fon","clean_name":"Yatırım Fonları","key":"fon"},{"category":"🥇 Fiziki Altın","value_try":391511.08920000005,"pct":0.29404125250290514,"platform":"Midas","comment":"Çeyrek (25) + Bilezik (2)","clean_name":"Fiziki Altın","key":"altin"},{"category":"🔗 Bitcoin","value_try":77931.97,"pct":0.058530178840254486,"platform":"Midas","comment":"0.0205038 BTC","clean_name":"Bitcoin","key":"bitcoin"},{"category":"🌐 VOO (S&P 500 ETF)","value_try":28091.6256,"pct":0.021097989314032114,"platform":"Midas","comment":"$704.89","clean_name":"VOO (S&P 500 ETF)","key":"voo"}],"total_try":1331483.5448,"stocks":[{"code":"AGESA","name":"Agesa Hayat Emeklili","qty":6.0,"avg_cost":237.73,"pnl":141.1,"price":261.25,"market_value_try":1567.5,"sector":"Sigorta","platform":"Midas","pct":0.0011772582591213709},{"code":"FROTO","name":"Ford Otomotiv","qty":40.0,"avg_cost":86.36,"pnl":-376.59,"price":76.95,"market_value_try":3078.0,"sector":"Otomotiv","platform":"Midas","pct":0.002311707127001965},{"code":"ENJSA","name":"Enerjisa Enerji","qty":173.0,"avg_cost":81.58,"pnl":4933.94,"price":110.1,"market_value_try":19047.3,"sector":"Enerji","platform":"Midas","pct":0.01430532136456937},{"code":"TUPRS","name":"Tüpraş - Türkiye Pet","qty":227.0,"avg_cost":207.52,"pnl":43749.27,"price":400.25,"market_value_try":90856.75,"sector":"Enerji","platform":"Midas","pct":0.06823723083535925},{"code":"RYSAS","name":"Reysaş Taşımacılık v","qty":407.0,"avg_cost":15.59,"pnl":5375.33,"price":28.8,"market_value_try":11721.6,"sector":"Lojistik","platform":"Midas","pct":0.0088034133397876},{"code":"MAVI","name":"Mavi Giyim","qty":488.0,"avg_cost":39.21,"pnl":-1136.4,"price":36.879999999999995,"market_value_try":17997.44,"sector":"Perakende","platform":"Midas","pct":0.013516832461270382},{"code":"MPARK","name":"MLP Sağlık Hizmetler","qty":73.0,"avg_cost":431.11,"pnl":-737.75,"price":421.0,"market_value_try":30733.0,"sector":"Sağlık","platform":"Midas","pct":0.023081772298294796},{"code":"LOGO","name":"Logo Yazılım","qty":81.0,"avg_cost":140.16,"pnl":-490.8,"price":134.1,"market_value_try":10862.1,"sector":"Teknoloji","platform":"Midas","pct":0.008157892782393776},{"code":"EREGL","name":"Ereğli Demir ve Çeli","qty":622.0,"avg_cost":26.48,"pnl":7647.97,"price":38.78,"market_value_try":24121.16,"sector":"Metal","platform":"Midas","pct":0.018116003081076904},{"code":"ISMEN","name":"İş Yatırım Menkul De","qty":1182.0,"avg_cost":38.02,"pnl":-5673.99,"price":33.22,"market_value_try":39266.04,"sector":"Finans","platform":"Midas","pct":0.029490443312912357},{"code":"AKSA","name":"Aksa Akrilik Kimya","qty":932.0,"avg_cost":10.61,"pnl":150.25,"price":10.77,"market_value_try":10037.64,"sector":"Kimya","platform":"Midas","pct":0.007538688734983756},{"code":"SISE","name":"Türkiye Şişe ve Cam","qty":1096.0,"avg_cost":41.02,"pnl":-1529.69,"price":39.62,"market_value_try":43423.52,"sector":"Cam/Sanayi","platform":"Midas","pct":0.03261288520581948},{"code":"RYGYO","name":"Reysaş Gayrimenkul Y","qty":1706.0,"avg_cost":25.21,"pnl":43664.22,"price":50.800000000000004,"market_value_try":86664.8,"sector":"GYO","platform":"Midas","pct":0.06508890052638074},{"code":"ENKAI","name":"Enka İnşaat","qty":661.0,"avg_cost":87.42,"pnl":-10.7,"price":87.4,"market_value_try":57771.4,"sector":"İnşaat","platform":"Midas","pct":0.04338874500223564},{"code":"TABGD","name":"Tab Gıda San. ve Tic","qty":122.0,"avg_cost":237.49,"pnl":-206.29,"price":235.79999999999998,"market_value_try":28767.6,"sector":"Gıda","platform":"Midas","pct":0.021605674446634738},{"code":"CLEBI","name":"Çelebi Hava Servisi","qty":32.0,"avg_cost":1534.17,"pnl":-2821.44,"price":1446.0,"market_value_try":46272.0,"sector":"Havacılık","platform":"Midas","pct":0.03475221318409191},{"code":"INTET","name":"İntetra Teknoloji ve","qty":64.0,"avg_cost":53.6,"pnl":0.0,"price":53.6,"market_value_try":3430.4,"sector":"Teknoloji","platform":"Midas","pct":0.0025763743107431905},{"code":"MGROS","name":"Migros Ticaret","qty":55.0,"avg_cost":580.1,"pnl":-2562.9,"price":533.5,"market_value_try":29342.5,"sector":"Perakende","platform":"Midas","pct":0.022037448464605314},{"code":"GWIND","name":"Galata Wind Enerji","qty":1257.0,"avg_cost":25.23,"pnl":-3250.2,"price":22.64,"market_value_try":28458.48,"sector":"Enerji","platform":"Midas","pct":0.02137351235855844}],"funds":[{"code":"KOCMT","name":"Eski","qty":0.285,"unit_price":4.631578947368421,"market_value_try":1.32,"platform":"İş Bankası"},{"code":"PATEK","name":"Eski","qty":0.82,"unit_price":20.71951219512195,"market_value_try":16.99,"platform":"İş Bankası"},{"code":"BINHO","name":"Eski","qty":0.35,"unit_price":9.714285714285715,"market_value_try":3.4,"platform":"İş Bankası"},{"code":"TGE","name":"İş Emtia Yabancı BY","qty":1744.0,"unit_price":0.29688646788990825,"market_value_try":517.77,"platform":"İş Bankası"},{"code":"TTA","name":"İş Altın Fonu","qty":3873.0,"unit_price":0.65143816163181,"market_value_try":2523.02,"platform":"İş Bankası"},{"code":"YTD","name":"YAPI KREDİ PORTFÖY","qty":1747.0,"unit_price":0.9630566685746995,"market_value_try":1682.46,"platform":"İş Bankası"},{"code":"TCD","name":"TACİRLER PORTFÖY DE","qty":36.0,"unit_price":49.895833333333336,"market_value_try":1796.25,"platform":"İş Bankası"},{"code":"AN1","name":"STRATEJİ PORTFÖY Bİ","qty":15.0,"unit_price":113.84333333333333,"market_value_try":1707.65,"platform":"İş Bankası"},{"code":"GBG","name":"INVEO PORTFÖY G-20","qty":1913.0,"unit_price":0.5933821223209619,"market_value_try":1135.14,"platform":"İş Bankası"},{"code":"DBH","name":"DENİZ PORTFÖY EUROB","qty":37300.0,"unit_price":0.3858828418230563,"market_value_try":14393.43,"platform":"İş Bankası"},{"code":"IPV","name":"İŞ PORTFÖY EUROBOND","qty":11.0,"unit_price":78.77090909090909,"market_value_try":866.48,"platform":"İş Bankası"},{"code":"ZDZ","name":"ZİRAAT PORTFÖY AGRE","qty":25.0,"unit_price":13.273599999999998,"market_value_try":331.84,"platform":"İş Bankası"},{"code":"MKG","name":"AKTİF PORTFÖY ALTIN","qty":1501.0,"unit_price":18.47864756828781,"market_value_try":27736.45,"platform":"İş Bankası"},{"code":"YZG","name":"YAPI KREDİ PORTFÖY","qty":3020.0,"unit_price":14.104317880794703,"market_value_try":42595.04,"platform":"İş Bankası"},{"code":"ITP","name":"İŞ PORTFÖY TEKNOLOJ","qty":97.0,"unit_price":13.31783505154639,"market_value_try":1291.83,"platform":"İş Bankası"},{"code":"OJT","name":"QNB PORTFÖY TEKNOLO","qty":2397.0,"unit_price":13.134847726324573,"market_value_try":31484.23,"platform":"İş Bankası"},{"code":"GJB","name":"INVEO PORTFÖY BİRİN","qty":581.0,"unit_price":10.772461273666094,"market_value_try":6258.8,"platform":"İş Bankası"},{"code":"IJC","name":"İŞ PORTFÖY YARI İLE","qty":151.0,"unit_price":16.01569536423841,"market_value_try":2418.37,"platform":"İş Bankası"},{"code":"ZFB","name":"AK PORTFÖY FİNTEK V","qty":173.0,"unit_price":7.2995375722543345,"market_value_try":1262.82,"platform":"İş Bankası"},{"code":"YJK","name":"YAPI KREDİ PORTFÖY","qty":322.0,"unit_price":5.752484472049689,"market_value_try":1852.3,"platform":"İş Bankası"},{"code":"OLD","name":"QNB PORTFÖY TEMİZ E","qty":292.0,"unit_price":3.2187328767123287,"market_value_try":939.87,"platform":"İş Bankası"},{"code":"DHM","name":"DENİZ PORTFÖY ESG-S","qty":786.0,"unit_price":5.389325699745547,"market_value_try":4236.01,"platform":"İş Bankası"},{"code":"DMG","name":"DENİZ PORTFÖY GÜMÜŞ","qty":6424.0,"unit_price":7.341548879202989,"market_value_try":47162.11,"platform":"İş Bankası"},{"code":"IEV","name":"İŞ PORTFÖY HAVACILI","qty":538.0,"unit_price":5.336710037174721,"market_value_try":2871.15,"platform":"İş Bankası"},{"code":"GVI","name":"GARANTİ PORTFÖY ÜÇÜ","qty":822.0,"unit_price":5.75294403892944,"market_value_try":4728.92,"platform":"İş Bankası"},{"code":"DVT","name":"DENİZ PORTFÖY METAV","qty":132.0,"unit_price":10.033030303030301,"market_value_try":1324.36,"platform":"İş Bankası"},{"code":"RTG","name":"ATA PORTFÖY ROBOTİK","qty":401.0,"unit_price":5.8137157107231925,"market_value_try":2331.3,"platform":"İş Bankası"},{"code":"CPU","name":"AKTİF PORTFÖY TEKNO","qty":228.0,"unit_price":3.9539912280701754,"market_value_try":901.51,"platform":"İş Bankası"},{"code":"CPT","name":"ROTA PORTFÖY ÇİP TE","qty":719.0,"unit_price":3.7873157162726008,"market_value_try":2723.08,"platform":"İş Bankası"},{"code":"GPT","name":"AKTİF PORTFÖY ROBOT","qty":439.0,"unit_price":2.836856492027335,"market_value_try":1245.38,"platform":"İş Bankası"},{"code":"JET","name":"ATA PORTFÖY HAVACIL","qty":1183.0,"unit_price":2.3880896027049876,"market_value_try":2825.11,"platform":"İş Bankası"},{"code":"GID","name":"GARANTİ PORTFÖY İNŞ","qty":927.0,"unit_price":1.7597411003236245,"market_value_try":1631.28,"platform":"İş Bankası"},{"code":"URA","name":"ATA PORTFÖY ENERJİ","qty":526.0,"unit_price":1.9981558935361217,"market_value_try":1051.03,"platform":"İş Bankası"},{"code":"GO9","name":"One Portföy Birinci","qty":777.0,"unit_price":2.8466151866151868,"market_value_try":2211.82,"platform":"Midas"},{"code":"HVS","name":"Hsbc Portföy Hisse S","qty":1282.0,"unit_price":1.6366614664586583,"market_value_try":2098.2,"platform":"Midas"},{"code":"KHA","name":"Pardus Portföy İkinc","qty":1279.0,"unit_price":4.665074276778734,"market_value_try":5966.63,"platform":"Midas"},{"code":"OPH","name":"Osmanlı Portföy Biri","qty":221.0,"unit_price":26.71126696832579,"market_value_try":5903.19,"platform":"Midas"},{"code":"MAC","name":"Marmara Capital Port","qty":12974.0,"unit_price":0.7590712193618006,"market_value_try":9848.19,"platform":"Midas"},{"code":"APLIB.F","name":"Ak Portföy BIST Liki","qty":235.0,"unit_price":45.339999999999996,"market_value_try":10654.9,"platform":"Midas"}],"gold":[{"type":"Çeyrek Altın","qty":25,"total_gram":43.75,"current_value_try":292696.69,"cost_try":194001.2,"profit_try":98695.49,"profit_pct":0.5087364923515937},{"type":"Bilezik","qty":2,"total_gram":14.770000000000003,"current_value_try":98814.4,"cost_try":65494.8,"profit_try":33319.6,"profit_pct":0.5087365714530008}],"gold_total":{"type":"TOPLAM ALTIN","qty":27,"total_gram":58.52,"cost_try":259496,"current_value_try":391511.08920000005,"profit_try":132015.08920000005,"profit_pct":0.5087365092332832},"crypto_etf":[{"asset":"Bitcoin","type":"Kripto Para","qty":0.0205038,"avg_cost":3045919.78,"current_price":3800854.96,"currency":"TRY","total_value_try":77931.97,"profit_pct":0.24785130206882414},{"asset":"VOO","type":"ETF (S&P 500)","qty":0.835828343,"avg_cost":632.47,"current_price":704.89,"currency":"USD","total_value_try":28091.6256,"profit_pct":0.11450215211243976}],"usd_try_rate":"47,68"},"EYLÜL":{"report_date":"30.09.2026","sheet_name":"EYLÜL","display_name":"Eylül","summary":[{"category":"📈 Hisse Senetleri","value_try":566729.42,"pct":0.43609421713779384,"platform":"Midas","comment":"18 pozisyon, BIST","clean_name":"Hisse Senetleri","key":"hisse"},{"category":"📊 Yatırım Fonları","value_try":248914.62,"pct":0.191538011813559,"platform":"İş B./Midas","comment":"37 fon","clean_name":"Yatırım Fonları","key":"fon"},{"category":"🥇 Fiziki Altın","value_try":376085.553054,"pct":0.28939513116491883,"platform":"Midas","comment":"Çeyrek (25) + Bilezik (2)","clean_name":"Fiziki Altın","key":"altin"},{"category":"🔗 Bitcoin","value_try":84070.93,"pct":0.06469197664450924,"platform":"Midas","comment":"0.0205038 BTC","clean_name":"Bitcoin","key":"bitcoin"},{"category":"🌐 VOO (S&P 500 ETF)","value_try":28423.0242,"pct":0.01828066323921911,"platform":"Midas","comment":"$700.86","clean_name":"VOO (S&P 500 ETF)","key":"voo"}],"total_try":1304223.547254,"stocks":[{"code":"AGESA","name":"Agesa Hayat Emeklili","qty":6.0,"avg_cost":237.73,"pnl":-56.6,"price":228.29999999999998,"market_value_try":1369.8,"sector":"Sigorta","platform":"Midas","pct":0.0010540512589506117},{"code":"FROTO","name":"Ford Otomotiv","qty":40.0,"avg_cost":86.36,"pnl":-512.59,"price":73.55,"market_value_try":2942.0,"sector":"Otomotiv","platform":"Midas","pct":0.0022638478637996054},{"code":"ENJSA","name":"Enerjisa Enerji","qty":173.0,"avg_cost":81.58,"pnl":4120.84,"price":105.4,"market_value_try":18234.2,"sector":"Enerji","platform":"Midas","pct":0.014031085900100193},{"code":"EREGL","name":"Ereğli Demir ve Çeli","qty":622.0,"avg_cost":26.48,"pnl":5881.49,"price":35.94,"market_value_try":22354.68,"sector":"Metal","platform":"Midas","pct":0.017201765657350022},{"code":"ISMEN","name":"İş Yatırım Menkul De","qty":1182.0,"avg_cost":38.02,"pnl":-9929.19,"price":29.619999999999997,"market_value_try":35010.84,"sector":"Finans","platform":"Midas","pct":0.026940589851743635},{"code":"AKSA","name":"Aksa Akrilik Kimya","qty":932.0,"avg_cost":10.61,"pnl":-334.39,"price":10.25,"market_value_try":9553.0,"sector":"Kimya","platform":"Midas","pct":0.007350964868415239},{"code":"CLEBI","name":"Çelebi Hava Servisi","qty":32.0,"avg_cost":1534.17,"pnl":-6757.44,"price":1323.0,"market_value_try":42336.0,"sector":"Havacılık","platform":"Midas","pct":0.03257724784562206},{"code":"RYSAS","name":"Reysaş Taşımacılık v","qty":408.0,"avg_cost":15.62,"pnl":3531.55,"price":24.28,"market_value_try":9906.24,"sector":"Lojistik","platform":"Midas","pct":0.007622780510634332},{"code":"ENKAI","name":"Enka İnşaat","qty":682.0,"avg_cost":87.4,"pnl":-3375.9,"price":82.45,"market_value_try":56230.9,"sector":"İnşaat","platform":"Midas","pct":0.04326927357054019},{"code":"MGROS","name":"Migros Ticaret","qty":59.0,"avg_cost":576.24,"pnl":-4232.9,"price":504.5,"market_value_try":29765.5,"sector":"Perakende","platform":"Midas","pct":0.022904338405821605},{"code":"LOGO","name":"Logo Yazılım","qty":96.0,"avg_cost":139.52,"pnl":-347.5,"price":135.9,"market_value_try":13046.4,"sector":"Teknoloji","platform":"Midas","pct":0.010039111070793737},{"code":"RYGYO","name":"Reysaş Gayrimenkul Y","qty":1856.0,"avg_cost":26.63,"pnl":39848.0,"price":48.1,"market_value_try":89273.6,"sector":"GYO","platform":"Midas","pct":0.06869539383198521},{"code":"MAVI","name":"Mavi Giyim","qty":538.0,"avg_cost":38.76,"pnl":-981.12,"price":36.940000000000005,"market_value_try":19873.72,"sector":"Perakende","platform":"Midas","pct":0.015292684761302345},{"code":"TUPRS","name":"Tüpraş - Türkiye Pet","qty":227.0,"avg_cost":203.87,"pnl":39130.49,"price":376.25,"market_value_try":85408.75,"sector":"Enerji","platform":"Midas","pct":0.06572141952321366},{"code":"MPARK","name":"MLP Sağlık Hizmetler","qty":81.0,"avg_cost":430.67,"pnl":-1046.25,"price":417.75,"market_value_try":33837.75,"sector":"Sağlık","platform":"Midas","pct":0.026037905524570054},{"code":"TABGD","name":"Tab Gıda San. ve Tic","qty":137.0,"avg_cost":236.47,"pnl":-3065.09,"price":214.1,"market_value_try":29331.7,"sector":"Gıda","platform":"Midas","pct":0.02257053242236944},{"code":"GWIND","name":"Galata Wind Enerji","qty":1309.0,"avg_cost":25.0,"pnl":-6863.82,"price":19.76,"market_value_try":25865.84,"sector":"Enerji","platform":"Midas","pct":0.019903578052135416},{"code":"SISE","name":"Türkiye Şişe ve Cam","qty":1155.0,"avg_cost":40.87,"pnl":-4812.77,"price":36.7,"market_value_try":42388.5,"sector":"Cam/Sanayi","platform":"Midas","pct":0.03261764621844649}],"funds":[{"code":"TGE","name":"İş Emtia Yabancı BY","qty":1744.0,"unit_price":0.30614678899082565,"market_value_try":533.92,"platform":"İş Bankası"},{"code":"TTA","name":"İş Altın Fonu","qty":3873.0,"unit_price":0.6022334107926671,"market_value_try":2332.45,"platform":"İş Bankası"},{"code":"YTD","name":"YAPI KREDİ PORTFÖY","qty":1747.0,"unit_price":1.0108414424728105,"market_value_try":1765.94,"platform":"İş Bankası"},{"code":"TCD","name":"TACİRLER PORTFÖY DE","qty":36.0,"unit_price":46.21666666666667,"market_value_try":1663.8,"platform":"İş Bankası"},{"code":"AN1","name":"STRATEJİ PORTFÖY Bİ","qty":15.0,"unit_price":109.35133333333333,"market_value_try":1640.27,"platform":"İş Bankası"},{"code":"GBG","name":"INVEO PORTFÖY G-20","qty":1913.0,"unit_price":0.6098013591217982,"market_value_try":1166.55,"platform":"İş Bankası"},{"code":"DBH","name":"DENİZ PORTFÖY EUROB","qty":37300.0,"unit_price":0.38664691689008046,"market_value_try":14421.93,"platform":"İş Bankası"},{"code":"IPV","name":"İŞ PORTFÖY EUROBOND","qty":11.0,"unit_price":78.99545454545455,"market_value_try":868.95,"platform":"İş Bankası"},{"code":"ZDZ","name":"ZİRAAT PORTFÖY AGRE","qty":25.0,"unit_price":10.289200000000001,"market_value_try":257.23,"platform":"İş Bankası"},{"code":"MKG","name":"AKTİF PORTFÖY ALTIN","qty":1501.0,"unit_price":17.046362425049967,"market_value_try":25586.59,"platform":"İş Bankası"},{"code":"YZG","name":"YAPI KREDİ PORTFÖY","qty":3020.0,"unit_price":12.455516556291393,"market_value_try":37615.66,"platform":"İş Bankası"},{"code":"ITP","name":"İŞ PORTFÖY TEKNOLOJ","qty":97.0,"unit_price":13.49041237113402,"market_value_try":1308.57,"platform":"İş Bankası"},{"code":"OJT","name":"QNB PORTFÖY TEKNOLO","qty":2397.0,"unit_price":13.182102628285357,"market_value_try":31597.5,"platform":"İş Bankası"},{"code":"GJB","name":"INVEO PORTFÖY BİRİN","qty":581.0,"unit_price":10.217779690189328,"market_value_try":5936.53,"platform":"İş Bankası"},{"code":"IJC","name":"İŞ PORTFÖY YARI İLE","qty":151.0,"unit_price":15.53317880794702,"market_value_try":2345.51,"platform":"İş Bankası"},{"code":"ZFB","name":"AK PORTFÖY FİNTEK V","qty":173.0,"unit_price":7.090462427745665,"market_value_try":1226.65,"platform":"İş Bankası"},{"code":"YJK","name":"YAPI KREDİ PORTFÖY","qty":322.0,"unit_price":5.764782608695652,"market_value_try":1856.26,"platform":"İş Bankası"},{"code":"OLD","name":"QNB PORTFÖY TEMİZ E","qty":292.0,"unit_price":2.9795205479452056,"market_value_try":870.02,"platform":"İş Bankası"},{"code":"DHM","name":"DENİZ PORTFÖY ESG-S","qty":786.0,"unit_price":5.252862595419847,"market_value_try":4128.75,"platform":"İş Bankası"},{"code":"DMG","name":"DENİZ PORTFÖY GÜMÜŞ","qty":6424.0,"unit_price":6.546181506849315,"market_value_try":42052.67,"platform":"İş Bankası"},{"code":"IEV","name":"İŞ PORTFÖY HAVACILI","qty":538.0,"unit_price":4.721561338289963,"market_value_try":2540.2,"platform":"İş Bankası"},{"code":"GVI","name":"GARANTİ PORTFÖY ÜÇÜ","qty":822.0,"unit_price":5.518053527980536,"market_value_try":4535.84,"platform":"İş Bankası"},{"code":"DVT","name":"DENİZ PORTFÖY METAV","qty":132.0,"unit_price":9.89409090909091,"market_value_try":1306.02,"platform":"İş Bankası"},{"code":"RTG","name":"ATA PORTFÖY ROBOTİK","qty":401.0,"unit_price":5.846558603491271,"market_value_try":2344.47,"platform":"İş Bankası"},{"code":"CPU","name":"AKTİF PORTFÖY TEKNO","qty":228.0,"unit_price":3.918245614035088,"market_value_try":893.36,"platform":"İş Bankası"},{"code":"CPT","name":"ROTA PORTFÖY ÇİP TE","qty":719.0,"unit_price":3.89961057023644,"market_value_try":2803.82,"platform":"İş Bankası"},{"code":"GPT","name":"AKTİF PORTFÖY ROBOT","qty":439.0,"unit_price":2.767767653758542,"market_value_try":1215.05,"platform":"İş Bankası"},{"code":"JET","name":"ATA PORTFÖY HAVACIL","qty":1183.0,"unit_price":2.1598732037193575,"market_value_try":2555.13,"platform":"İş Bankası"},{"code":"GID","name":"GARANTİ PORTFÖY İNŞ","qty":927.0,"unit_price":1.477799352750809,"market_value_try":1369.92,"platform":"İş Bankası"},{"code":"URA","name":"ATA PORTFÖY ENERJİ","qty":526.0,"unit_price":1.741235741444867,"market_value_try":915.89,"platform":"İş Bankası"},{"code":"GO9","name":"One Portföy Birinci","qty":777.0,"unit_price":2.4598198198198196,"market_value_try":1911.28,"platform":"Midas"},{"code":"KHA","name":"Pardus Portföy İkinc","qty":1279.0,"unit_price":4.297959343236904,"market_value_try":5497.09,"platform":"Midas"},{"code":"APLIB.F","name":"Ak Portföy BIST Liki","qty":235.0,"unit_price":43.4,"market_value_try":10199.0,"platform":"Midas"},{"code":"ICF","name":"Teb Portföy Birinci","qty":22.0,"unit_price":183.70772727272728,"market_value_try":4041.57,"platform":"Midas"},{"code":"MAC","name":"Marmara Capital Port","qty":15834.0,"unit_price":0.6785531135531135,"market_value_try":10744.21,"platform":"Midas"},{"code":"HVS","name":"Hsbc Portföy Hisse S","qty":4507.0,"unit_price":1.5093543376969158,"market_value_try":6802.66,"platform":"Midas"},{"code":"OPH","name":"Osmanlı Portföy Biri","qty":427.0,"unit_price":23.56758782201405,"market_value_try":10063.36,"platform":"Midas"}],"gold":[{"type":"Çeyrek Altın","qty":25,"total_gram":43.75,"current_value_try":281164.44,"cost_try":194001.2,"profit_try":87163.24,"profit_pct":0.4492922724189335},{"type":"Bilezik","qty":2,"total_gram":14.770000000000003,"current_value_try":94921.11,"cost_try":65494.8,"profit_try":29426.31,"profit_pct":0.449292310229209}],"gold_total":{"type":"TOPLAM ALTIN","qty":27,"total_gram":58.52,"cost_try":259496,"current_value_try":376085.553054,"profit_try":116589.55305400002,"profit_pct":0.4492922937309246},"crypto_etf":[{"asset":"Bitcoin","type":"Kripto Para","qty":0.0205038,"avg_cost":3045919.78,"current_price":4100260.93,"currency":"TRY","total_value_try":84070.93,"profit_pct":0.3461486918223286},{"asset":"VOO","type":"ETF (S&P 500)","qty":0.837559689,"avg_cost":632.62,"current_price":700.86,"currency":"USD","total_value_try":28423.0242,"profit_pct":0.10785928820853877}],"usd_try_rate":"48,42"}};

const MONTH_ORDER = ['OCAK','ŞUBAT','MART','NİSAN','MAYIS','HAZİRAN','TEMMUZ','AĞUSTOS','EYLÜL'];
const BENCHMARK_DATA = {"bist100":{"OCAK":22.9,"ŞUBAT":-0.9,"MART":-6.8,"NİSAN":12.9,"MAYIS":-5.4,"HAZİRAN":3.4,"TEMMUZ":-4.7,"AĞUSTOS":6.5,"EYLÜL":-12.67},"usd":{"ŞUBAT":1.06,"MART":1.17,"NİSAN":1.34,"MAYIS":1.28,"HAZİRAN":2.24,"TEMMUZ":2.63,"AĞUSTOS":0.34,"EYLÜL":1.66},"altin":{"ŞUBAT":9.57,"MART":-8.04,"NİSAN":-3.82,"MAYIS":-1.24,"HAZİRAN":-5.98,"TEMMUZ":-1.68,"AĞUSTOS":9.4,"EYLÜL":-3.94},"enflasyon":{"OCAK":4.84,"ŞUBAT":2.96,"MART":1.94,"NİSAN":4.18,"MAYIS":1.71,"HAZİRAN":0.99,"TEMMUZ":1.78,"AĞUSTOS":1.84,"EYLÜL":1.84}};

// Midas ekstrelerinden: ay -> kod -> {A:[adet, ort. alış fiyatı], S:[adet, ort. satış fiyatı]}
const TRADES = {"OCAK":{"RYSAS":{"A":[300,14.1145]},"GWIND":{"A":[50,24.88]}},"ŞUBAT":{"CLEBI":{"A":[2,1758.5]},"GWIND":{"A":[50,25.696]},"SISE":{"A":[10,44.54]},"ISMEN":{"A":[10,47.96]}},"MART":{"MAVI":{"A":[70,41.2371]},"GWIND":{"A":[48,24.12]},"ISMEN":{"A":[105,44.1505]},"TABGD":{"A":[9,246.8111]},"AKSA":{"A":[119,9.8802]},"ENKAI":{"A":[153,92.4464]},"MGROS":{"A":[4,571.5]},"CLEBI":{"A":[1,1670.0]},"MPARK":{"A":[3,433.0]},"SISE":{"A":[2,43.84]},"RYGYO":{"A":[79,30.4149]},"AGESA":{"A":[1,222.4]},"ENJSA":{"A":[12,116.2]},"TUPRS":{"A":[8,239.5]},"RYSAS":{"A":[50,19.03]}},"NİSAN":{"ISMEN":{"A":[106,41.6609]},"AKSA":{"A":[167,10.4383]},"GWIND":{"A":[100,28.43]},"LOGO":{"A":[27,136.2407]},"TUPRS":{"A":[11,253.1]},"MAVI":{"A":[55,43.5364]},"MGROS":{"A":[7,640.2143]},"CLEBI":{"A":[1,1824.0]},"RYGYO":{"A":[63,32.5067]},"ENKAI":{"A":[25,100.64]},"RYSAS":{"A":[55,20.344]},"MPARK":{"A":[7,456.3929]}},"MAYIS":{"VESBE":{"S":[649,7.16]},"MPARK":{"A":[20,451.2625]},"MAVI":{"A":[5,42.94]},"SISE":{"A":[57,45.0796]},"GWIND":{"A":[184,28.1353]},"RYSAS":{"A":[1,20.46]},"TUPRS":{"A":[5,262.5]},"RYGYO":{"A":[41,29.8493]},"ENKAI":{"A":[50,102.23]},"CLEBI":{"A":[4,1682.5]},"LOGO":{"A":[16,157.0625]},"ISMEN":{"A":[35,40.3543]},"AGESA":{"A":[5,242.2]},"AKSA":{"A":[100,11.03]},"MGROS":{"A":[3,687.5]},"GO9":{"A":[777,2.5715]},"MAC":{"A":[1693,0.7946]},"HVS":{"A":[637,1.5695]},"OPH":{"A":[41,25.168]},"TABGD":{"A":[5,254.5]},"FROTO":{"A":[10,84.15]}},"HAZİRAN":{"ENKAI":{"A":[105,93.531]},"LOGO":{"A":[16,148.8438]},"RYGYO":{"A":[242,31.9647]},"TUPRS":{"A":[82,229.4915]},"MAC":{"A":[8643,0.8156]},"OPH":{"A":[180,25.5732]},"BDS":{"S":[420,2.4931]},"HVS":{"A":[645,1.5493]},"MPARK":{"A":[17,434.7941]},"GWIND":{"A":[80,26.47]},"MAVI":{"A":[100,42.831]},"ENJSA":{"A":[10,104.5]},"CLEBI":{"A":[1,1617.0]},"SISE":{"A":[20,44.12]},"ISMEN":{"A":[50,36.328]},"TABGD":{"A":[45,253.7667]},"AKSA":{"A":[100,10.78]},"MGROS":{"A":[1,682.5]},"KHA":{"A":[194,3.5393]}},"TEMMUZ":{"ORZAX":{"A":[36,69.0],"S":[36,79.8]},"GOLDA":{"A":[111,9.2],"S":[111,12.24]},"TABGD":{"A":[25,223.28]},"MGROS":{"A":[2,634.0]},"ENKAI":{"A":[85,88.9618]},"RYGYO":{"A":[186,31.4034]},"MAVI":{"A":[120,39.555]},"MAC":{"A":[2638,0.7705]},"MPARK":{"A":[20,407.125]},"CLEBI":{"A":[16,1497.1875]},"GWIND":{"A":[245,24.6457]},"RYSAS":{"A":[1,21.04]},"TTRAK":{"S":[24,415.0]},"ISMEN":{"A":[70,34.6514]},"SISE":{"A":[20,41.82]}},"AĞUSTOS":{"QUICK":{"A":[36,76.6],"S":[36,80.2]},"MGROS":{"A":[30,571.3833]},"MPARK":{"A":[6,402.9583]},"SISE":{"A":[145,40.971]},"ENKAI":{"A":[167,83.0689]},"CLEBI":{"A":[4,1487.0]},"ISMEN":{"A":[79,33.859]},"LOGO":{"A":[10,136.1]},"EREGL":{"A":[100,38.22]},"CITAS":{"A":[31,73.7],"S":[31,81.05]},"AKSA":{"A":[208,11.9142]},"RYGYO":{"A":[50,40.5]},"TABGD":{"A":[10,251.0]},"INTET":{"A":[64,53.6]},"APLIB.F":{"A":[235,48.01]},"GWIND":{"A":[8,22.88]}},"EYLÜL":{"INTET":{"S":[64,78.35]},"MGROS":{"A":[4,523.25]},"SISE":{"A":[59,38.1027]},"MPARK":{"A":[8,426.6562]},"TABGD":{"A":[15,228.1933]},"LOGO":{"A":[15,136.0667]},"ENKAI":{"A":[21,86.8905]},"RYSAS":{"A":[1,28.42]},"RYGYO":{"A":[150,42.8335]},"ICF":{"A":[22,185.9523]},"HVS":{"A":[3225,1.5494]},"OPH":{"A":[206,24.312]},"MAVI":{"A":[50,34.42]},"MAC":{"A":[2860,0.6993]},"GWIND":{"A":[52,19.6342]}}};

// Altın/gümüş/kıymetli maden fonları "Fonlar"dan çıkarılıp Kıymetli Madenler'e taşınır.
const PRECIOUS_CODES = new Set(['TTA', 'MKG', 'DMG', 'YZG']);
const isPreciousFund = (f) => PRECIOUS_CODES.has(f.code) || /ALTIN|GÜMÜŞ|MADEN|PLATİN|PALADYUM/.test(String(f.name || '').toLocaleUpperCase('tr-TR'));
const IGNORED_FUNDS = new Set(['KOCMT', 'PATEK', 'BINHO']); // İş Bankası'nda küsuratlı kalan eski kalıntılar, hiç gösterilmez
const FULL_NAMES = {
  AGESA: 'Agesa Hayat ve Emeklilik', AKSA: 'Aksa Akrilik Kimya Sanayii', CLEBI: 'Çelebi Hava Servisi', ENJSA: 'Enerjisa Enerji',
  ENKAI: 'Enka İnşaat ve Sanayi', EREGL: 'Ereğli Demir ve Çelik Fabrikaları', FROTO: 'Ford Otomotiv Sanayi', GWIND: 'Galata Wind Enerji',
  ISMEN: 'İş Yatırım Menkul Değerler', LOGO: 'Logo Yazılım Sanayi ve Ticaret', MAVI: 'Mavi Giyim Sanayi ve Ticaret', MGROS: 'Migros Ticaret',
  MPARK: 'MLP Sağlık Hizmetleri', RYGYO: 'Reysaş Gayrimenkul Yatırım Ortaklığı', RYSAS: 'Reysaş Taşımacılık ve Lojistik Ticaret',
  SISE: 'Türkiye Şişe ve Cam Fabrikaları', TABGD: 'TAB Gıda Sanayi ve Ticaret', TUPRS: 'Tüpraş - Türkiye Petrol Rafinerileri',
  TTRAK: 'Türk Traktör ve Ziraat Makineleri', VESBE: 'Vestel Beyaz Eşya Sanayi ve Ticaret',
  ZFB: 'Ak Portföy Fintek ve Blokzinciri Teknolojileri Değişken Fon', GPT: 'Aktif Portföy Robotik Teknolojileri Değişken Fon',
  CPU: 'Aktif Portföy Teknoloji Katılım Fonu', URA: 'Ata Portföy Enerji Değişken Fon',
  JET: 'Ata Portföy Havacılık ve Savunma Teknolojileri Değişken Fon', RTG: 'Ata Portföy Robotik Teknolojileri Değişken Fon',
  DVT: 'Deniz Portföy Metaverse ve Dijital Yaşam Teknolojileri Değişken Fon', DBH: 'Deniz Portföy Eurobond (Döviz) Borçlanma Araçları Fonu',
  DHM: 'Deniz Portföy ESG Sürdürülebilirlik Fon Sepeti Fonu', GID: 'Garanti Portföy İnşaat Sektörü Hisse Senedi Fonu',
  GVI: 'Garanti Portföy Üçüncü Fon Sepeti Fonu', GBG: 'Inveo Portföy G-20 Ülkeleri Yabancı Hisse Senedi Fonu',
  GJB: 'Inveo Portföy Gedik Portföy Birinci Fon Sepeti Fonu', IEV: 'İş Portföy Havacılık ve Savunma Teknolojileri Değişken Fon',
  ITP: 'İş Portföy Teknoloji Karma Fon', IJC: 'İş Portföy Yarı İletken Teknolojileri Değişken Fon',
  IPV: 'İş Portföy Eurobond (Döviz) Borçlanma Araçları Fonu', TGE: 'İş Portföy Emtia Yabancı BYF Fon Sepeti Fonu',
  OJT: 'QNB Portföy Teknoloji Fon Sepeti Fonu', OLD: 'QNB Portföy Temiz Enerji ve Su Fon Sepeti Fonu',
  CPT: 'Rota Portföy Çip Teknolojileri Değişken Fon', AN1: 'Strateji Portföy Birinci Değişken Fon',
  TCD: 'Tacirler Portföy Değişken Fon', YJK: 'Yapı Kredi Portföy Robotik ve Yarı İletken Teknolojileri Fon Sepeti Fonu',
  YTD: 'Yapı Kredi Portföy Yabancı Fon Sepeti Fonu', ZDZ: 'Ziraat Portföy Agresif Değişken Fon',
  AAV: 'Ata Portföy İkinci Değişken Fon', AES: 'Ak Portföy Petrol Yabancı BYF Fon Sepeti', GSP: 'Azimut PYŞ Kar Payı Fonu',
  NHY: 'Neo Portföy Birinci Değişken Fon', KPH: 'İş Portföy Kar Payı Fonu', NPH: 'Nurol Portföy Birinci Değişken Fon',
  ICF: 'TEB Portföy Birinci Hisse Senedi Fonu', HVS: 'HSBC Portföy Hisse Senedi Fonu', MAC: 'Marmara Capital Portföy Hisse Senedi Fonu',
  OPH: 'Osmanlı Portföy Birinci Hisse Senedi Fonu', GO9: 'One Portföy Birinci Hisse Senedi Fonu',
  KHA: 'Pardus Portföy İkinci Hisse Senedi Fonu', BDS: 'Pardus Portföy BIST 30 Dışı Hisse Senedi Fonu',
  'APLIB.F': 'Ak Portföy BIST Likit Banka Endeksi Fonu',
  TTA: 'İş Portföy Kıymetli Madenler — Altın Fonu', MKG: 'Aktif Portföy Altın Katılım Fonu',
  DMG: 'Deniz Portföy Gümüş Fon Sepeti Fonu', YZG: 'Yapı Kredi Portföy Gümüş Fon Sepeti Fonu',
};
Object.values(RAW_DATA).forEach(m => {
  const ignoredVal = m.funds.filter(f => IGNORED_FUNDS.has(f.code)).reduce((s, f) => s + f.market_value_try, 0);
  m.funds = m.funds.filter(f => !IGNORED_FUNDS.has(f.code));
  m.total_try -= ignoredVal;
  const precious = m.funds.filter(isPreciousFund);
  m.funds = m.funds.filter(f => !isPreciousFund(f));
  m.precious_funds = precious;
  const pv = precious.reduce((s, f) => s + f.market_value_try, 0);
  m.summary.forEach(c => {
    if (c.key === 'fon') { c.value_try -= pv + ignoredVal; c.comment = m.funds.length + ' fon'; }
    if (c.key === 'altin') {
      c.value_try += pv;
      c.comment = 'Çeyrek (25) + Bilezik (2)' + (precious.length ? ' + ' + precious.length + ' fon' : '');
      c.category = '🥇 Kıymetli Madenler'; c.clean_name = 'Kıymetli Madenler';
    }
  });
  m.summary.forEach(c => { c.pct = c.value_try / m.total_try; });
  [...m.stocks, ...m.funds, ...m.precious_funds].forEach(x => {
    x.pct = x.market_value_try / m.total_try;
    if (FULL_NAMES[x.code]) x.name = FULL_NAMES[x.code];
  });
});


const CATEGORY_META = {
  hisse:   { label: 'Hisse Senetleri', color: '#3ecf8e', short: 'Hisse' },
  fon:     { label: 'Yatırım Fonları', color: '#5b8fd9', short: 'Fon' },
  altin:   { label: 'Kıymetli Madenler',    color: '#e8b84b', short: 'Altın' },
  bitcoin: { label: 'Bitcoin',         color: '#e8a856', short: 'BTC' },
  voo:     { label: 'VOO (S&P 500)',   color: '#c07de0', short: 'VOO' },
};

const SECTOR_PALETTE = ['#3ecf8e','#5b8fd9','#e8b84b','#e8a856','#c07de0','#5de0c4','#e87d9a','#8fd95b','#7d9ae8','#d9c45b','#e85b7d','#5bd9a8'];
function colorForIndex(i) { return SECTOR_PALETTE[i % SECTOR_PALETTE.length]; }

// Mutable display-currency state, read by fmtTRY on every call. Set once per render from the
// component's state so all 38+ call sites automatically respect the user's TL/USD toggle
// without needing to be rewritten individually.
const displayCurrencyState = { mode: 'TRY', usdRate: 1 };

function fmtTRY(n, opts = {}) {
  if (n === null || n === undefined || Number.isNaN(n)) return '—';
  const { decimals = 0, sign = false } = opts;
  if (displayCurrencyState.mode === 'USD' && displayCurrencyState.usdRate) {
    const usdVal = n / displayCurrencyState.usdRate;
    const usdDecimals = opts.decimals !== undefined ? opts.decimals : (Math.abs(usdVal) < 1000 ? 2 : 0);
    const s = Math.abs(usdVal).toLocaleString('en-US', { minimumFractionDigits: usdDecimals, maximumFractionDigits: usdDecimals });
    const prefix = usdVal < 0 ? '-' : (sign && usdVal > 0 ? '+' : '');
    return prefix + '$' + s;
  }
  const s = Math.abs(n).toLocaleString('tr-TR', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  const prefix = n < 0 ? '-' : (sign && n > 0 ? '+' : '');
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
  let buys = 0, sells = 0, marketMove = 0;
  const sumPositions = (curList, prevList) => {
    const pm = Object.fromEntries(prevList.map(p => [p.code, p]));
    const cm = Object.fromEntries(curList.map(p => [p.code, p]));
    new Set([...Object.keys(cm), ...Object.keys(pm)]).forEach(k => {
      const cur = cm[k], prev = pm[k];
      const curVal = cur ? cur.market_value_try : 0, prevVal = prev ? prev.market_value_try : 0;
      if (cur && prev) {
        const unit = cur.qty ? curVal / cur.qty : 0;
        const byQty = (cur.qty - prev.qty) * unit;
        if (byQty >= 0) buys += byQty; else sells += byQty;
        marketMove += (curVal - prevVal) - byQty;
      } else if (cur) buys += curVal;
      else if (prev) sells -= prevVal;
    });
  };
  const allFunds = m => [...m.funds, ...(m.precious_funds || [])];
  sumPositions(month.stocks, prevMonth.stocks);
  sumPositions(allFunds(month), allFunds(prevMonth));
  const toPos = m => m.crypto_etf.filter(c => c.qty !== null && typeof c.total_value_try === 'number').map(c => ({ code: c.asset, qty: c.qty, market_value_try: c.total_value_try }));
  sumPositions(toPos(month), toPos(prevMonth));
  if (month.gold_total && prevMonth.gold_total) marketMove += month.gold_total.current_value_try - prevMonth.gold_total.current_value_try;
  return { buys, sells, marketMove, total: buys + sells + marketMove };
}

export default function PortfolioDashboard() {
  const [monthIdx, setMonthIdx] = useState(MONTH_ORDER.length - 1);
  const [tab, setTab] = useState('genel');
  const [currency, setCurrency] = useState('TRY');

  const monthKey = MONTH_ORDER[monthIdx];
  const month = RAW_DATA[monthKey];
  const prevKey = monthIdx > 0 ? MONTH_ORDER[monthIdx - 1] : null;
  const prevMonth = prevKey ? RAW_DATA[prevKey] : null;
  const firstMonth = RAW_DATA[MONTH_ORDER[0]];

  // Sync the module-level display state that fmtTRY reads from, using the selected month's
  // own USD/TRY rate (so amounts convert using the rate relevant to the period being viewed).
  displayCurrencyState.mode = currency;
  displayCurrencyState.usdRate = parseFloat(String(month.usd_try_rate).replace(',', '.'));

  const prevFundsAll = prevMonth ? [...prevMonth.funds, ...(prevMonth.precious_funds || [])] : null;
  const bm = (k) => BENCHMARK_DATA[k] ? BENCHMARK_DATA[k][monthKey] : undefined;
  const portfolioPct = prevMonth && prevMonth.total_try ? (computeCashFlow(month, prevMonth).marketMove / prevMonth.total_try) * 100 : undefined;
  const gramGold = month.gold_total ? month.gold_total.current_value_try / month.gold_total.total_gram : null;
  const tickerItems = [
    { name: 'USD/TRY', value: '₺' + fmtNum(displayCurrencyState.usdRate, 2), pct: bm('usd') },
    { name: 'Gram Altın', value: gramGold ? fmtTRY(gramGold) : null, pct: bm('altin') },
    { name: 'BIST100', value: null, pct: bm('bist100') },
    { name: 'TÜFE', value: null, pct: bm('enflasyon') },
    { name: 'Portföy (piyasa)', value: null, pct: portfolioPct },
  ];

  const totalChange = prevMonth ? month.total_try - prevMonth.total_try : null;
  const totalChangePct = prevMonth ? (month.total_try / prevMonth.total_try - 1) : null;
  const totalChangeSinceStart = month.total_try - firstMonth.total_try;
  const totalChangeSinceStartPct = (month.total_try / firstMonth.total_try - 1);

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
        .portfolio-sidebar { position: fixed; z-index: 20; inset: 0 auto 0 0; width: 236px; background: #071a2c; border-right: 1px solid #1d3c53; display: flex; flex-direction: column; padding: 29px 15px; box-shadow: 12px 0 40px #020c1822; }
        .portfolio-sidebar-brand { padding: 4px 13px 32px; font-size: 19px; font-weight: 700; color: #eaf8ff; letter-spacing: -.035em; }
        .portfolio-sidebar-brand span { color: #35e1be; }
        .portfolio-sidebar-label { color: #66849a; font: 10px 'IBM Plex Mono', monospace; letter-spacing: .16em; padding: 0 13px 13px; }
        .portfolio-sidebar-button { display: flex; align-items: center; gap: 12px; width: 100%; padding: 13px 14px; border: 1px solid transparent; border-radius: 11px; background: transparent; color: #9cb4c6; font: 12px 'IBM Plex Mono', monospace; text-align: left; cursor: pointer; margin-bottom: 5px; }
        .portfolio-sidebar-button.active { background: linear-gradient(90deg,#123d50,#0e3045); color: #54f2d1; border-color: #205669; }
        .portfolio-sidebar-button:hover { background: #12344a; color: #e6ffff; }
        .portfolio-sidebar-foot { margin-top: auto; padding: 17px 12px; border-top: 1px solid #1c3b50; font-size: 11px; color: #7694a8; line-height: 1.8; }
        .portfolio-content { margin-left: 236px; min-width: 0; }
        .portfolio-content main { max-width: 1500px; }
        .portfolio-content .portfolio-mobile-tabs { display: none !important; }
        @media (max-width: 900px) { .portfolio-sidebar { width: 74px; padding: 22px 8px; } .portfolio-sidebar-brand { font-size: 12px; padding: 6px 3px 25px; text-align: center; } .portfolio-sidebar-brand span, .portfolio-sidebar-label, .portfolio-nav-text, .portfolio-sidebar-foot { display: none; } .portfolio-sidebar-button { justify-content: center; padding: 13px 5px; font-size: 19px; } .portfolio-content { margin-left: 74px; } }
        @media (max-width: 580px) { .portfolio-sidebar { display: none; } .portfolio-content { margin-left: 0; } .portfolio-content .portfolio-mobile-tabs { display: flex !important; } }
        @media (min-width: 581px) { .portfolio-content .portfolio-mobile-tabs { display: none !important; } }
        .portfolio-content .row-hover:hover { background: #14354a !important; }
        /* Premium dashboard layout: retain every existing chart, table and calculation. */
        .portfolio-content { background: radial-gradient(ellipse at 70% 0%,rgba(23,108,126,.18),transparent 44%),#071322; min-height:100vh; }
        .portfolio-sidebar { background:linear-gradient(180deg,#071c2d,#061322 80%); box-shadow:12px 0 40px rgba(0,0,0,.16); padding-top:35px; }
        .portfolio-sidebar-brand { font-size:22px; padding-bottom:46px; }
        .portfolio-sidebar-button { margin:3px 0; font-size:13px; font-weight:600; }
        .portfolio-content header { border-bottom:0!important; padding-top:42px!important; padding-bottom:30px!important; }
        .portfolio-content header h1 { font-size:clamp(28px,3vw,43px)!important; font-weight:800!important; letter-spacing:-.055em!important; }
        .portfolio-content header > div { align-items:center!important; }
        .portfolio-content main { padding-top:28px!important; }
        .overview-dashboard { display:grid; grid-template-columns:minmax(0,1.55fr) minmax(290px,1fr); gap:20px; align-items:start; }
        .overview-dashboard > .dashboard-stats { grid-column:1/-1; display:grid!important; grid-template-columns:repeat(3,minmax(0,1fr))!important; gap:18px!important; margin-bottom:3px!important; }
        .dashboard-stat { background:linear-gradient(145deg,#102d41,#0b2133)!important; border:1px solid #234459!important; border-radius:18px!important; padding:24px!important; box-shadow:0 12px 32px rgba(0,0,0,.14); min-width:0; }
        .dashboard-stat > div:nth-child(2) { font-size:clamp(20px,2vw,29px)!important; letter-spacing:-.045em!important; }
        .overview-dashboard > .dashboard-panel { min-width:0; margin:0!important; border:1px solid #234459!important; border-radius:18px!important; background:linear-gradient(145deg,#10283b,#0b1d2d)!important; overflow:hidden; box-shadow:0 10px 30px rgba(0,0,0,.12); }
        .overview-dashboard > .dashboard-panel:first-of-type { grid-column:1/-1; }
        .overview-dashboard > .dashboard-panel:nth-of-type(n+5) { grid-column:1/-1; }
        .dashboard-panel > div:first-child { color:#dceef5!important; font-weight:700!important; font-size:14px!important; letter-spacing:.01em!important; padding:19px 22px!important; }
        .portfolio-content .month-btn { border-radius:9px!important; margin:8px 3px!important; }
        .portfolio-content .month-btn:hover { background:#164054!important; }
        @media(max-width:1100px) { .overview-dashboard { grid-template-columns:1fr; } .overview-dashboard > .dashboard-panel { grid-column:1/-1!important; } }
        @media(max-width:650px) { .overview-dashboard > .dashboard-stats { grid-template-columns:1fr!important; } .portfolio-content header > div { align-items:flex-start!important; } }
        .portfolio-content button:focus-visible, .portfolio-sidebar-button:focus-visible { outline: 2px solid #39e8c6; outline-offset: 2px; }

      `}</style>

      <aside className="portfolio-sidebar">
        <div className="portfolio-sidebar-brand">◈ PORTFÖY<span>360</span></div>
        <div className="portfolio-sidebar-label">PORTFÖY YÖNETİMİ</div>
        {[
          ['genel', '◫', 'Genel Bakış'], ['hisse', '▥', 'Hisse Senetleri'],
          ['fon', '◈', 'Yatırım Fonları'], ['altin', '◆', 'Kıymetli Madenler'],
          ['btc', '₿', 'Bitcoin'], ['etf', '◉', 'ETF / Endeks']
        ].map(([id, glyph, label]) => (
          <button key={id} type="button" title={label} className={'portfolio-sidebar-button' + (tab === id ? ' active' : '')} onClick={() => setTab(id)}>
            <span style={{ fontSize: 19, width: 22, textAlign: 'center' }}>{glyph}</span><span className="portfolio-nav-text">{label}</span>
          </button>
        ))}
        <div className="portfolio-sidebar-foot">PORTFÖY RAPORU<br />{month.report_date}<br />Tüm veriler aylık ekstrelerden</div>
      </aside>
      <div className="portfolio-content">
      <div style={styles.bgTexture} />

      <div style={styles.ticker}>
        <div style={styles.tickerInner}>
          <span style={{ color: '#6d7885' }}>{month.display_name.toUpperCase()}</span>
          {tickerItems.map(it => (
            <span key={it.name} style={{ whiteSpace: 'nowrap' }}>
              <span style={{ color: '#a9b4c0' }}>{it.name}</span>
              {it.value && <span style={{ color: '#eef2f5', marginLeft: 6 }}>{it.value}</span>}
              <span style={{ marginLeft: 6, color: it.pct == null ? '#6d7885' : it.pct >= 0 ? '#3ecf8e' : '#e8687a' }}>
                {it.pct == null ? '—' : '(' + (it.pct > 0 ? '+' : '') + it.pct.toFixed(2).replace('.', ',') + '%)'}
              </span>
            </span>
          ))}
        </div>
      </div>
      <header style={styles.header}>
        <div style={styles.headerInner}>
          <div>
            <div style={styles.kicker}>● YATIRIM KONTROL MERKEZİ <span style={{color:"#7f9bb2",marginLeft:12}}> / {month.report_date}</span></div>
            <h1 style={styles.title}>Portföy <span style={{color:'#41e9cb'}}>Genel Bakış</span></h1><div style={{color:'#8da9bc',fontSize:13,marginTop:10}}>Varlıkların, performansın ve aylık yatırım raporların tek ekranda.</div>
          </div>
          <div style={styles.headerTotal}>
            <button
              onClick={() => setCurrency(c => c === 'TRY' ? 'USD' : 'TRY')}
              style={styles.currencyToggle}
            >
              <span style={{ opacity: currency === 'TRY' ? 1 : 0.4 }}>₺ TL</span>
              <span style={{ margin: '0 6px', opacity: 0.4 }}>/</span>
              <span style={{ opacity: currency === 'USD' ? 1 : 0.4 }}>$ USD</span>
            </button>
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
        <div style={styles.tabs} className="portfolio-mobile-tabs">
          {[
            { id: 'genel', label: 'Genel Bakış' },
            { id: 'hisse', label: 'Hisseler' },
            { id: 'fon', label: 'Fonlar' },
            { id: 'altin', label: 'Kıymetli Madenler' },
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
          <div className="fade-in overview-dashboard">
            {/* Summary stat cards */}
            <div className="dashboard-stats" style={styles.statGrid}>
              <StatCard
                label="Başlangıçtan bu yana"
                value={fmtTRY(totalChangeSinceStart, { sign: true })}
                sub={fmtPct(totalChangeSinceStartPct, { sign: true }) + ' · ' + firstMonth.display_name + '\'tan beri'}
                positive={totalChangeSinceStart >= 0}
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

            {/* Total value history chart */}
            <Panel title="Toplam Portföy Değeri — Aylık Seyir">
              <HistoryChart series={historySeries} activeIdx={monthIdx} min={minTotal} max={maxTotal} />
            </Panel>

            {monthIdx > 0 && (() => {
              const prevKey = MONTH_ORDER[monthIdx - 1];
              const prevMonthData = RAW_DATA[prevKey];
              const flow = computeCashFlow(month, prevMonthData);
              const portfolioPct = prevMonthData.total_try ? (flow.marketMove / prevMonthData.total_try) * 100 : null;
              return (
                <Panel title={month.display_name + ' — Performans Kıyaslama (Aylık % Değişim)'}>
                  <ComparisonChart
                    items={[
                      { name: 'Portföyüm (piyasa)', color: '#3ecf8e', value: portfolioPct },
                      { name: 'BIST100', color: '#5b8fd9', value: BENCHMARK_DATA.bist100[monthKey] },
                      { name: 'USD/TRY', color: '#e8b84b', value: BENCHMARK_DATA.usd[monthKey] },
                      { name: 'Altın', color: '#e0a04a', value: BENCHMARK_DATA.altin[monthKey] },
                      { name: 'Enflasyon', color: '#e8687a', value: BENCHMARK_DATA.enflasyon[monthKey] },
                    ]}
                  />
                </Panel>
              );
            })()}

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
                const parts = [
                  { label: 'Alım', value: flow.buys, color: '#5b8fd9' },
                  { label: 'Piyasa Hareketi', value: flow.marketMove, color: '#e8b84b' },
                  { label: 'Satış (çıkış)', value: flow.sells, color: '#8a94a0' },
                ];
                const barTotal = parts.reduce((a, x) => a + Math.abs(x.value), 0) || 1;
                return (
                  <Panel title={prevMonth.display_name + ' → ' + month.display_name + ' — Nakit Akışı'}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                        <span style={{ fontSize: 13, color: '#a9b4c0' }}>Toplam değişim</span>
                        <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 15, fontWeight: 600, color: flow.total >= 0 ? '#3ecf8e' : '#e8687a' }}>{fmtTRY(flow.total, {sign:true})}</span>
                      </div>
                      <div style={styles.barTrack}>
                        <div style={{ display: 'flex', height: '100%' }}>
                          {parts.map((x, i) => <div key={i} style={{ width: Math.abs(x.value) / barTotal * 100 + '%', background: x.color }} />)}
                        </div>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, flexWrap: 'wrap' }}>
                        {parts.map((x, i) => (
                          <div key={i}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                              <span style={{ width: 8, height: 8, borderRadius: 999, background: x.color }} />
                              <span style={{ fontSize: 12, color: '#a9b4c0' }}>{x.label}</span>
                            </div>
                            <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 14, color: '#e4edf8', marginTop: 3 }}>{fmtTRY(x.value, {sign:true})}</div>
                          </div>
                        ))}
                      </div>
                      <div style={{ fontSize: 11, color: '#576270', marginTop: 4 }}>
                        Alım: ay içinde artan adetlerin parasal karşılığı (satışlar dahil değil). Satış ayrı gösterilir; toplam = alım + piyasa hareketi + satış.
                      </div>
                    </div>
                  </Panel>
                );
            })()}

            <div style={styles.twoCol}>
              {/* Category breakdown */}
              <Panel title={month.display_name + ' — Aylık Kategori Isı Haritası'}>
                {(() => {
                  const goldPos = m => m.gold_total ? [{ code: 'ALTIN', qty: m.gold_total.total_gram, market_value_try: m.gold_total.current_value_try }] : [];
                  const cryptoPos = (m, a) => m.crypto_etf.filter(c => c.asset === a && c.qty != null && typeof c.total_value_try === 'number').map(c => ({ code: c.asset, qty: c.qty, market_value_try: c.total_value_try }));
                  const lists = {
                    hisse: [month.stocks, prevMonth && prevMonth.stocks],
                    fon: [month.funds, prevMonth && prevMonth.funds],
                    altin: [[...goldPos(month), ...month.precious_funds], prevMonth && [...goldPos(prevMonth), ...prevMonth.precious_funds]],
                    bitcoin: [cryptoPos(month, 'Bitcoin'), prevMonth && cryptoPos(prevMonth, 'Bitcoin')],
                    voo: [cryptoPos(month, 'VOO'), prevMonth && cryptoPos(prevMonth, 'VOO')],
                  };
                  const hm = month.summary.map(c => {
                    const [cur, prev] = lists[c.key] || [[], null];
                    const st = prev ? categoryStats(cur, prev) : null;
                    const ret = st && st.prevValue > 0 ? st.market / st.prevValue : null;
                    return { key: c.key, label: (CATEGORY_META[c.key] || { label: c.clean_name }).label, share: c.pct, ret,
                      sub: fmtPct(c.pct) + ' pay' + (st ? ' · ' + fmtTRY(st.change, { sign: true }) : '') };
                  });
                  return <Heatmap items={hm} height={300} minShare={0.09} note="küçük kategoriler okunabilirlik için büyütülmüştür; gerçek pay kutunun içinde yazar" />;
                })()}
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
                          <span style={{ color: '#e4edf8', fontWeight: 600 }}>{meta.label}</span>
                          <span style={{ color: '#3ecf8e' }}>+{fmtTRY(mostGrown.diff)}</span>
                        </div>
                      </div>
                    );
                  })()}
                  {month.gold_total && (
                    <div style={{ marginTop: 6, paddingTop: 12, borderTop: '1px solid #2a3542' }}>
                      <div style={{ fontSize: 11.5, color: '#6d7885', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Fiziki Altın Kâr/Zarar</div>
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
            {(() => {
              const st = prevMonth ? categoryStats(month.stocks, prevMonth.stocks) : null;
              const value = month.stocks.reduce((a, s) => a + s.market_value_try, 0);
              const pnl = month.stocks.reduce((a, s) => a + (typeof s.pnl === 'number' ? s.pnl : 0), 0);
              const cost = month.stocks.reduce((a, s) => a + (typeof s.avg_cost === 'number' ? s.avg_cost * s.qty : 0), 0);
              return (
                <div style={styles.statGrid}>
                  <StatCard label="Toplam Değer" value={fmtTRY(value)} sub={fmtPct(value / month.total_try) + ' portföy payı · ' + month.stocks.length + ' hisse'} />
                  <StatCard label="Kâr/Zarar" value={fmtTRY(pnl, { sign: true })} sub={cost ? fmtPct(pnl / cost, { sign: true }) + ' · maliyete göre' : ''} positive={pnl >= 0} />
                  {monthlyCards(st, prevMonth)}
                </div>
              );
            })()}
            <Panel title={month.display_name + ' — Hisse Isı Haritası (aylık fiyat değişimi)'}>
              <Heatmap
                height={340} minShare={0.02}
                items={month.stocks.map(s => ({ key: s.code, label: s.code, share: s.market_value_try / month.stocks.reduce((a, x) => a + x.market_value_try, 0),
                  ret: priceChange(s, prevMonth ? prevMonth.stocks : null, x => x.price), sub: fmtPct(s.pct) + ' pay' }))}
              />
            </Panel>
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
                columns={['KOD', 'ADI', 'ADET', 'ORT. MALİYET', 'FİYAT', 'DEĞER', 'K/Z', 'K/Z %', 'AYLIK %', 'PAY', 'SEKTÖR']}
                rows={[...month.stocks].sort((a,b)=>b.market_value_try-a.market_value_try).map(s => {
                  const costBasis = typeof s.avg_cost === 'number' && s.qty ? s.avg_cost * s.qty : null;
                  const pnlPct = typeof s.pnl === 'number' && costBasis ? s.pnl / costBasis : null;
                  return [
                    <span style={{ fontWeight: 600, color: '#5de0a8' }}>{s.code}</span>,
                    <NameCell>{s.name}</NameCell>,
                    fmtNum(s.qty),
                    typeof s.avg_cost === 'number' ? fmtTRY(s.avg_cost, {decimals:2}) : '—',
                    fmtTRY(s.price, {decimals:2}),
                    fmtTRY(s.market_value_try),
                    typeof s.pnl === 'number' ? <span style={{ color: s.pnl >= 0 ? '#3ecf8e' : '#e8687a' }}>{fmtTRY(s.pnl, {sign:true})}</span> : '—',
                    pnlPct !== null ? <span style={{ color: pnlPct >= 0 ? '#3ecf8e' : '#e8687a' }}>{fmtPct(pnlPct, {sign:true})}</span> : '—',
                    pctCell(priceChange(s, prevMonth ? prevMonth.stocks : null, x => x.price)),
                    fmtPct(s.pct),
                    <span style={{ color: '#6d7885' }}>{s.sector}</span>,
                  ];
                })}
                prevRows={prevMonth ? prevMonth.stocks : null}
                keyField={month.stocks.map(s=>s.code)}
              />
            </Panel>
            {prevMonth && <MovementPanel title={prevMonth.display_name + ' → ' + month.display_name + ' — Hisse Hareketleri'} rows={computeMovements(month.stocks, prevMonth.stocks, TRADES[monthKey], s => s.price)} />}
          </div>
        )}

        {tab === 'fon' && (
          <div className="fade-in">
            {(() => {
              const st = prevMonth ? categoryStats(month.funds, prevMonth.funds) : null;
              const value = month.funds.reduce((a, f) => a + f.market_value_try, 0);
              return (
                <div style={styles.statGrid}>
                  <StatCard label="Toplam Değer" value={fmtTRY(value)} sub={fmtPct(value / month.total_try) + ' portföy payı · ' + month.funds.length + ' fon'} />
                  {monthlyCards(st, prevMonth)}
                </div>
              );
            })()}
            <FundGroupPanel title={month.display_name + ' — Varlık Grubuna Göre Fon Dağılımı'} funds={month.funds} prevFunds={prevMonth ? prevMonth.funds : null} />
            <Panel title={month.display_name + ' — Yatırım Fonu Pozisyonları (' + month.funds.length + ' fon)'} noPad>
              <PositionTable
                columns={['KOD', 'ADI', 'ADET', 'BİRİM FİYAT', 'DEĞER', 'AYLIK %', 'PAY', 'PLATFORM']}
                rows={[...month.funds].sort((a,b)=>b.market_value_try-a.market_value_try).map(f => [
                  <span style={{ fontWeight: 600, color: '#7aa8c9' }}>{f.code}</span>,
                  <NameCell>{f.name}</NameCell>,
                  fmtNum(f.qty),
                  fmtNum(f.unit_price, 4),
                  fmtTRY(f.market_value_try),
                  pctCell(priceChange(f, prevFundsAll, fundPrice)),
                  fmtPct(f.pct),
                  <span style={{ color: '#6d7885' }}>{f.platform}</span>,
                ])}
              />
            </Panel>
            {prevMonth && <MovementPanel title={prevMonth.display_name + ' → ' + month.display_name + ' — Fon Hareketleri'} rows={computeMovements(month.funds, prevMonth.funds, TRADES[monthKey], fundPrice)} />}
          </div>
        )}

        {tab === 'altin' && (
          <div className="fade-in">
            {(() => {
              const g = month.gold_total;
              const gold = g ? g.current_value_try : 0;
              const fundsVal = month.precious_funds.reduce((a, f) => a + f.market_value_try, 0);
              const total = gold + fundsVal;
              let change = null, market = null, buys = null;
              if (prevMonth && g && prevMonth.gold_total) {
                const st = categoryStats(month.precious_funds, prevMonth.precious_funds);
                const goldDiff = gold - prevMonth.gold_total.current_value_try;
                change = st.change + goldDiff; market = st.market + goldDiff; buys = st.buys;
              }
              return (
                <div style={styles.statGrid}>
                  <StatCard label="Toplam Kıymetli Maden" value={fmtTRY(total)} sub={fmtPct(total / month.total_try) + ' portföy payı · fiziki + fon'} />
                  <StatCard label="Fiziki Altın" value={fmtTRY(gold)} sub={g ? fmtNum(g.total_gram, 2) + ' gr · K/Z ' + fmtPct(g.profit_pct, { sign: true }) : ''} />
                  <StatCard label="Altın / Gümüş Fonları" value={fmtTRY(fundsVal)} sub={month.precious_funds.length + ' fon · ' + fmtPct(fundsVal / month.total_try) + ' pay'} />
                  <StatCard label="Aylık Değişim" value={change !== null ? fmtTRY(change, { sign: true }) : '—'}
                    sub={change !== null ? 'piyasa ' + fmtTRY(market, { sign: true }) + ' · alım ' + fmtTRY(buys) : 'İlk kayıtlı ay'} positive={change !== null ? change >= 0 : undefined} />
                </div>
              );
            })()}
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
            {month.precious_funds.length > 0 && (
              <Panel title={month.display_name + ' — Kıymetli Maden Fonları (' + month.precious_funds.length + ' fon)'} noPad>
                <PositionTable
                  columns={['KOD', 'ADI', 'ADET', 'BİRİM FİYAT', 'DEĞER', 'AYLIK %', 'PAY', 'PLATFORM']}
                  rows={[...month.precious_funds].sort((a,b)=>b.market_value_try-a.market_value_try).map(f => [
                    <span style={{ fontWeight: 600, color: '#e8b84b' }}>{f.code}</span>, <NameCell>{f.name}</NameCell>, fmtNum(f.qty), fmtNum(f.unit_price, 4), fmtTRY(f.market_value_try),
                    pctCell(priceChange(f, prevFundsAll, fundPrice)), fmtPct(f.pct),
                    <span style={{ color: '#6d7885' }}>{f.platform}</span>,
                  ])}
                />
              </Panel>
            )}
            {prevMonth && <MovementPanel title={prevMonth.display_name + ' → ' + month.display_name + ' — Kıymetli Maden Hareketleri'} rows={computeMovements(month.precious_funds, prevMonth.precious_funds, TRADES[monthKey], fundPrice)} />}
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
            {prevMonth && <MovementPanel title={prevMonth.display_name + ' → ' + month.display_name + ' — Bitcoin Hareketleri'} rows={cryptoMovements(month, prevMonth, 'Bitcoin')} />}
          </div>
        )}

        {tab === 'etf' && (
          <div className="fade-in">
            {(() => {
              const a = month.crypto_etf.find(c => c.asset === 'VOO');
              if (!a) return null;
              const pa = prevMonth ? prevMonth.crypto_etf.find(c => c.asset === 'VOO') : null;
              const diff = pa ? a.total_value_try - pa.total_value_try : null;
              return (
                <div style={styles.statGrid}>
                  <StatCard label="Değer (TL)" value={fmtTRY(a.total_value_try)} sub={fmtPct(a.total_value_try / month.total_try) + ' portföy payı'} />
                  <StatCard label="Miktar" value={fmtNum(a.qty, 6) + ' adet'} sub={'$' + fmtNum(a.current_price, 2) + ' / adet'} />
                  <StatCard label="Kâr/Zarar %" value={typeof a.profit_pct === 'number' ? fmtPct(a.profit_pct, { sign: true }) : '—'} sub="Maliyete göre" positive={typeof a.profit_pct === 'number' ? a.profit_pct >= 0 : undefined} />
                  <StatCard label="Aylık Değişim" value={diff !== null ? fmtTRY(diff, { sign: true }) : '—'} sub={pa ? prevMonth.display_name + "'a göre" : 'İlk kayıt'} positive={diff !== null ? diff >= 0 : undefined} />
                </div>
              );
            })()}
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
            {prevMonth && <MovementPanel title={prevMonth.display_name + ' → ' + month.display_name + ' — ETF Hareketleri'} rows={cryptoMovements(month, prevMonth, 'VOO')} />}
          </div>
        )}
      </main>

      <footer style={styles.footer}>
        <span>{MONTH_ORDER.length} aylık kayıt · {firstMonth.display_name}-{month.display_name} 2026</span>
      </footer>
      </div>
    </div>
  );
}

function StatCard({ label, value, sub, positive }) {
  return (
    <div className="dashboard-stat" style={styles.statCard}>
      <div style={styles.statLabel}>{label}</div>
      <div style={{ ...styles.statValue, color: positive === undefined ? '#eef2f5' : (positive ? '#3ecf8e' : '#e8687a') }}>{value}</div>
      <div style={styles.statSub}>{sub}</div>
    </div>
  );
}

function Panel({ title, children, noPad }) {
  return (
    <div className="dashboard-panel" style={styles.panel}>
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

function ComparisonChart({ items }) {
  const isNarrow = useIsNarrow();
  const sorted = [...items].sort((a, b) => {
    const av = a.value === null || a.value === undefined ? -Infinity : a.value;
    const bv = b.value === null || b.value === undefined ? -Infinity : b.value;
    return bv - av;
  });
  const vals = sorted.map(i => i.value).filter(v => v !== null && v !== undefined);
  const maxAbs = Math.max(...vals.map(Math.abs), 1);

  const w = 500, h = 260;
  const padL = isNarrow ? 10 : 20, padR = isNarrow ? 10 : 20, padT = 24, padB = 44;
  const innerW = w - padL - padR, innerH = h - padT - padB;
  const zeroY = padT + innerH / 2;
  const scale = (innerH / 2) / (maxAbs * 1.2);

  const n = sorted.length;
  const slotW = innerW / n;
  const barW = Math.min(46, slotW * 0.55);

  return (
    <div style={{ overflowX: isNarrow ? 'visible' : 'auto' }} className="scrollbar-thin">
      <svg viewBox={'0 0 ' + w + ' ' + h} style={{ width: '100%', minWidth: isNarrow ? 0 : 320, height: 'auto', display: 'block' }}>
        <line x1={padL} x2={w - padR} y1={zeroY} y2={zeroY} stroke="#4a5560" strokeWidth="1" />
        {sorted.map((it, i) => {
          const v = it.value;
          const has = v !== null && v !== undefined;
          const x = padL + i * slotW + (slotW - barW) / 2;
          const barH = has ? Math.abs(v) * scale : 0;
          const y = has && v >= 0 ? zeroY - barH : zeroY;
          const labelY = has ? (v >= 0 ? y - 6 : y + barH + 14) : zeroY - 6;
          return (
            <g key={i}>
              <rect x={x} y={y} width={barW} height={Math.max(barH, 1)} fill={has ? it.color : '#2a3542'} rx="2" />
              <text x={x + barW/2} y={labelY} textAnchor="middle" fontSize="11" fontWeight="600" fontFamily="IBM Plex Mono, monospace" fill={has ? it.color : '#6d7885'}>
                {has ? (v > 0 ? '+' : '') + v.toFixed(2).replace('.', ',') + '%' : '—'}
              </text>
              <text x={x + barW/2} y={h - padB + 16} textAnchor="middle" fontSize="10.5" fill="#a9b4c0" fontFamily="IBM Plex Mono, monospace">
                {it.name}
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

function categoryStats(curList, prevList) {
  const pm = Object.fromEntries(prevList.map(p => [p.code, p]));
  const cm = Object.fromEntries(curList.map(c => [c.code, c]));
  let buys = 0, sells = 0, market = 0;
  curList.forEach(c => {
    const p = pm[c.code], cv = c.market_value_try;
    if (p) {
      const byQty = (c.qty - p.qty) * (c.qty ? cv / c.qty : 0);
      if (byQty >= 0) buys += byQty; else sells += byQty;
      market += (cv - p.market_value_try) - byQty;
    } else buys += cv;
  });
  prevList.forEach(p => { if (!cm[p.code]) sells -= p.market_value_try; });
  const value = curList.reduce((a, x) => a + x.market_value_try, 0);
  const prevValue = prevList.reduce((a, x) => a + x.market_value_try, 0);
  return { value, prevValue, change: value - prevValue, buys, sells, market };
}
const priceChange = (item, prevList, priceOf) => {
  const p = prevList && prevList.find(x => x.code === item.code);
  const a = p && priceOf(p), b = priceOf(item);
  return a && b ? b / a - 1 : null;
};
const pctCell = v => (v === null || v === undefined) ? '—' : <span style={{ color: v >= 0 ? '#3ecf8e' : '#e8687a' }}>{fmtPct(v, { sign: true })}</span>;
const NameCell = ({ children }) => <span style={{ display: 'inline-block', minWidth: 170, whiteSpace: 'normal', lineHeight: 1.35 }}>{children}</span>;
const monthlyCards = (st, prevMonth) => ([
  <StatCard key="chg" label="Aylık Değişim" value={st ? fmtTRY(st.change, { sign: true }) : '—'}
    sub={st ? 'piyasa ' + fmtTRY(st.market, { sign: true }) + ' · alım ' + fmtTRY(st.buys) : 'İlk kayıtlı ay'} positive={st ? st.change >= 0 : undefined} />,
  <StatCard key="buy" label="Ay İçi Alım" value={st ? fmtTRY(st.buys) : '—'} sub={st ? 'satış: ' + fmtTRY(Math.abs(st.sells)) : ''} />,
]);

function layoutTreemap(items, x, y, w, h, out) {
  if (!items.length) return out;
  if (items.length === 1) { out.push({ ...items[0], x, y, w, h }); return out; }
  const total = items.reduce((a, i) => a + i.weight, 0);
  let acc = 0, best = 1, bestDiff = Infinity;
  for (let k = 1; k < items.length; k++) {
    acc += items[k - 1].weight;
    const diff = Math.abs(acc - total / 2);
    if (diff < bestDiff) { bestDiff = diff; best = k; }
  }
  const left = items.slice(0, best), right = items.slice(best);
  const lw = left.reduce((a, i) => a + i.weight, 0) / total;
  if (w >= h) { layoutTreemap(left, x, y, w * lw, h, out); layoutTreemap(right, x + w * lw, y, w * (1 - lw), h, out); }
  else { layoutTreemap(left, x, y, w, h * lw, out); layoutTreemap(right, x, y + h * lw, w, h * (1 - lw), out); }
  return out;
}
const heatColor = r => {
  if (r === null || r === undefined) return '#1c2530';
  const i = Math.min(Math.abs(r) / 0.08, 1);
  return r >= 0 ? 'rgba(46,190,130,' + (0.22 + 0.6 * i) + ')' : 'rgba(232,95,115,' + (0.22 + 0.6 * i) + ')';
};
// items: {key, label, share (0-1, kutu boyutu), ret (kesir | null, renk), sub (küçük satır)}
function Heatmap({ items, height = 300, minShare = 0.09, note }) {
  const isNarrow = useIsNarrow();
  const H = isNarrow ? Math.round(height * 1.15) : height;
  const aspect = isNarrow ? 1 : 1.9;
  const sized = [...items].sort((a, b) => b.share - a.share).map(i => ({ ...i, weight: Math.max(i.share, minShare) }));
  const tiles = layoutTreemap(sized, 0, 0, 100 * aspect, 100, []).map(tl => ({ ...tl, x: tl.x / aspect, w: tl.w / aspect }));
  const noPrev = items.every(i => i.ret === null || i.ret === undefined);
  return (
    <div>
      <div style={{ position: 'relative', width: '100%', height: H }}>
        {tiles.map(tl => {
          const showSub = tl.w >= 16 && tl.h >= 28, showRet = tl.w >= 9 && tl.h >= 14;
          const hasRet = tl.ret !== null && tl.ret !== undefined;
          return (
            <div key={tl.key} title={tl.label + (hasRet ? ' ' + fmtPct(tl.ret, { sign: true }) : '') + (tl.sub ? ' · ' + tl.sub : '')}
              style={{ position: 'absolute', left: tl.x + '%', top: tl.y + '%', width: tl.w + '%', height: tl.h + '%', boxSizing: 'border-box', border: '2px solid #141a23', borderRadius: 6,
                background: heatColor(tl.ret), padding: '6px 8px', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ fontSize: showRet ? 12.5 : 10, fontWeight: 600, color: '#eef2f5', lineHeight: 1.25 }}>{tl.label}</div>
              {showRet && <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 16, fontWeight: 700, color: '#fff', marginTop: 2 }}>{hasRet ? fmtPct(tl.ret, { sign: true }) : '—'}</div>}
              {showSub && tl.sub && <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 10.5, color: '#e4edf8', opacity: 0.85, marginTop: 3, lineHeight: 1.3 }}>{tl.sub}</div>}
            </div>
          );
        })}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 10, fontSize: 10.5, color: '#6d7885', fontFamily: 'IBM Plex Mono, monospace' }}>
        <span>−%8</span>
        <span style={{ flex: '0 1 140px', height: 6, borderRadius: 3, background: 'linear-gradient(90deg, rgba(232,95,115,0.82), #1c2530, rgba(46,190,130,0.82))' }} />
        <span>+%8</span>
      </div>
      <div style={{ fontSize: 11, color: '#576270', marginTop: 6 }}>
        {noPrev ? 'İlk kayıtlı ay — kıyaslanacak önceki ay yok. ' : ''}Renk: o ayki piyasa getirisi (alım/satım hariç fiyat etkisi). Kutu boyutu: portföy payı{note ? ' · ' + note : ''}.
      </div>
    </div>
  );
}

const FUND_GROUPS = [
  { label: 'BIST Hisse Senedi Fonları', color: '#3ecf8e', codes: ['HVS','MAC','OPH','GO9','KHA','BDS','ICF','GID','APLIB.F'], re: /HİSSE/ },
  { label: 'Teknoloji · Yarı İletken · Robotik · Fintek', color: '#5b8fd9', codes: ['ITP','OJT','CPU','CPT','IJC','YJK','RTG','GPT','ZFB','DVT'], re: /TEKNOLOJİ|YARI İLETKEN|ROBOTİK|ÇİP|FİNTEK/ },
  { label: 'Havacılık & Savunma', color: '#c07de0', codes: ['IEV','JET'], re: /HAVACILIK|SAVUNMA/ },
  { label: 'Enerji & Emtia', color: '#e8a856', codes: ['URA','OLD','TGE','AES'], re: /ENERJİ|EMTİA|PETROL/ },
  { label: 'Yabancı Hisse / Yabancı Fon Sepeti', color: '#5de0c4', codes: ['GBG','YTD'], re: /YABANCI/ },
  { label: 'Eurobond / Döviz Borçlanma', color: '#e87d9a', codes: ['DBH','IPV'], re: /EUROBOND|BORÇLANMA/ },
  { label: 'Karma · Değişken · Fon Sepeti', color: '#8a94a0', codes: ['GVI','GJB','AN1','TCD','ZDZ','DHM','AAV','NHY','NPH','GSP','KPH'] },
];
function fundGroupOf(f) {
  const hit = FUND_GROUPS.find(g => g.codes.includes(f.code));
  if (hit) return hit;
  const n = String(f.name || '').toLocaleUpperCase('tr-TR');
  return FUND_GROUPS.find(g => g.re && g.re.test(n)) || FUND_GROUPS[FUND_GROUPS.length - 1];
}
function FundGroupPanel({ title, funds, prevFunds }) {
  const total = funds.reduce((a, f) => a + f.market_value_try, 0) || 1;
  const groups = FUND_GROUPS.map(g => {
    const cur = funds.filter(f => fundGroupOf(f) === g);
    const prev = prevFunds ? prevFunds.filter(f => fundGroupOf(f) === g) : null;
    const st = prev ? categoryStats(cur, prev) : null;
    return { g, cur, value: cur.reduce((a, f) => a + f.market_value_try, 0), ret: st && st.prevValue > 0 ? st.market / st.prevValue : null };
  }).filter(x => x.cur.length > 0).sort((a, b) => b.value - a.value);
  return (
    <Panel title={title}>
      <div style={{ marginBottom: 18 }}>
        <Heatmap height={260} minShare={0.07}
          items={groups.map(({ g, cur, value, ret }) => ({ key: g.label, label: g.label, share: value / total, ret, sub: cur.length + ' fon · ' + fmtPct(value / total) }))} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {groups.map(({ g, cur, value, ret }) => (
          <div key={g.label}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 10, flexWrap: 'wrap', marginBottom: 5 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 13.5, color: '#e4edf8', fontWeight: 500 }}>
                <span style={{ width: 9, height: 9, borderRadius: 2, background: g.color, display: 'inline-block' }} />
                {g.label} <span style={{ color: '#6d7885', fontSize: 11.5, fontWeight: 400 }}>· {cur.length} fon</span>
              </span>
              <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 13, color: '#a9b4c0' }}>
                {fmtTRY(value)} <span style={{ color: '#6d7885', fontSize: 11.5 }}>({fmtPct(value / total)})</span>
                {ret !== null && <span style={{ marginLeft: 8, color: ret >= 0 ? '#3ecf8e' : '#e8687a' }}>{fmtPct(ret, { sign: true })} ay</span>}
              </span>
            </div>
            <div style={styles.barTrack}><div className="bar-fill" style={{ ...styles.barFillBase, width: (value / total * 100) + '%', background: g.color }} /></div>
            <div style={{ fontSize: 11, color: '#6d7885', marginTop: 4, fontFamily: 'IBM Plex Mono, monospace', lineHeight: 1.6 }}>
              {[...cur].sort((a, b) => b.market_value_try - a.market_value_try).map(f => f.code + ' ' + fmtTRY(f.market_value_try)).join('  ·  ')}
            </div>
          </div>
        ))}
      </div>
      <div style={{ fontSize: 11, color: '#576270', marginTop: 14 }}>
        Gruplama fonun adına/türüne göredir; fonun içindeki gerçek varlık ağırlığı (TEFAS portföy dağılımı) değildir. Altın/gümüş fonları Kıymetli Madenler sekmesindedir. "ay" = o ayki fiyat etkisi.
      </div>
    </Panel>
  );
}

const fundPrice = f => f.unit_price != null ? f.unit_price : (f.qty ? f.market_value_try / f.qty : null);

function computeMovements(curList, prevList, trades, priceOf) {
  const cm = Object.fromEntries(curList.map(x => [x.code, x]));
  const pm = Object.fromEntries(prevList.map(x => [x.code, x]));
  const rows = [];
  new Set([...Object.keys(cm), ...Object.keys(pm)]).forEach(code => {
    const c = cm[code], p = pm[code];
    const cq = c ? c.qty : 0, pq = p ? p.qty : 0, d = cq - pq;
    if (!(Math.abs(d) > 1e-9)) return;
    const exact = ((trades && trades[code]) || {})[d > 0 ? 'A' : 'S'];
    const price = exact ? exact[1] : priceOf(d > 0 ? (c || p) : (p || c));
    rows.push({ code, name: (c || p).name, status: pq === 0 ? 'YENİ' : cq === 0 ? 'ÇIKTI' : d > 0 ? 'ALIM' : 'SATIM', d, pq, cq, price, approx: !exact, amount: Math.abs(d) * price });
  });
  return rows.sort((a, b) => b.amount - a.amount);
}

function cryptoMovements(month, prevMonth, asset) {
  const c = month.crypto_etf.find(x => x.asset === asset), p = prevMonth.crypto_etf.find(x => x.asset === asset);
  if (!c || !p || c.qty == null || p.qty == null) return [];
  const d = c.qty - p.qty;
  if (!(Math.abs(d) > 1e-9)) return [];
  const usd = c.currency === 'USD';
  let price = c.current_price, approx = true;
  if (d > 0 && typeof c.avg_cost === 'number' && typeof p.avg_cost === 'number') {
    const implied = (c.avg_cost * c.qty - p.avg_cost * p.qty) / d;
    if (implied > 0) { price = implied; approx = usd; }
  }
  const rate = parseFloat(String(month.usd_try_rate).replace(',', '.'));
  return [{ code: asset, name: usd ? 'S&P 500 ETF' : 'Bitcoin', status: d > 0 ? 'ALIM' : 'SATIM', d, pq: p.qty, cq: c.qty, price, approx, usd, amount: Math.abs(d) * price * (usd ? rate : 1) }];
}

function MovementPanel({ title, rows }) {
  const badge = { ALIM: ['#1c3d33', '#3ecf8e'], YENİ: ['#1c3d33', '#3ecf8e'], SATIM: ['#3d3220', '#e8b84b'], ÇIKTI: ['#3d2129', '#e8687a'] };
  return (
    <Panel title={title} noPad>
      {rows.length === 0 ? (
        <div style={{ padding: '16px 20px', fontSize: 12.5, color: '#6d7885' }}>Bu ay adet hareketi yok.</div>
      ) : (
        <div style={{ overflowX: 'auto' }} className="scrollbar-thin">
          <table style={styles.miniTable}>
            <thead>
              <tr>{['İŞLEM', 'KOD', 'ADET DEĞİŞİMİ', 'ÖNCEKİ → YENİ ADET', 'BİRİM MALİYET', 'TUTAR'].map((h, i) => <th key={i} style={styles.th}>{h}</th>)}</tr>
            </thead>
            <tbody>
              {rows.map((r, i) => {
                const dec = !Number.isInteger(r.d) && Math.abs(r.d) < 10 ? 6 : 0;
                const [bg, fg] = badge[r.status];
                const pd = r.price < 10 ? 4 : r.price < 1000 ? 2 : 0;
                return (
                  <tr key={i} className="row-hover">
                    <td style={styles.td}><span style={{ fontSize: 10, fontWeight: 600, padding: '2px 7px', borderRadius: 4, background: bg, color: fg }}>{r.status}</span></td>
                    <td style={{ ...styles.td, fontWeight: 600, color: '#5de0a8' }} title={r.name}>{r.code}</td>
                    <td style={{ ...styles.td, color: r.d > 0 ? '#3ecf8e' : '#e8b84b' }}>{(r.d > 0 ? '+' : '−') + fmtNum(Math.abs(r.d), dec)}</td>
                    <td style={styles.td}>{fmtNum(r.pq, dec)} → {fmtNum(r.cq, dec)}</td>
                    <td style={styles.td}>{(r.approx ? '~' : '') + (r.usd ? '$' + fmtNum(r.price, 2) : fmtTRY(r.price, { decimals: pd }))}</td>
                    <td style={styles.td}>{fmtTRY(r.amount)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div style={{ padding: '10px 14px', fontSize: 11, color: '#576270' }}>
            Alımlarda birim maliyet gerçek alım fiyatıdır; satışlarda satış fiyatı gösterilir. "~" ekstrede fiyat bulunamadığı için ay sonu fiyatı kullanıldığını belirtir.
          </div>
        </div>
      )}
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
              <span style={{ color: '#e4edf8' }}>{item.label}</span>
              <span style={{ fontFamily: 'IBM Plex Mono, monospace', color: '#a9b4c0' }}>{fmtPct(item.value / total)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  ticker: { position: 'relative', zIndex: 1, background: 'rgba(5, 20, 37, 0.88)', borderBottom: '1px solid rgba(83, 153, 205, 0.22)', overflowX: 'auto' },
  tickerInner: { maxWidth: 1440, margin: '0 auto', padding: '8px 24px', display: 'flex', gap: 28, alignItems: 'center', fontFamily: 'IBM Plex Mono, monospace', fontSize: 12 },
  currencyToggle: {
    background: '#1c2530', border: '1px solid rgba(83, 153, 205, 0.30)', borderRadius: 999,
    padding: '5px 12px', marginBottom: 10, cursor: 'pointer',
    fontFamily: 'IBM Plex Mono, monospace', fontSize: 12, color: '#e4edf8',
  },
  page: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #061426 0%, #071b30 48%, #061322 100%)',
    color: '#e4edf8',
    fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
    position: 'relative',
  },
  bgTexture: {
    position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0,
    backgroundImage: 'radial-gradient(circle at 15% 8%, rgba(0,224,178,0.10), transparent 42%), radial-gradient(circle at 85% 90%, rgba(38,132,255,0.10), transparent 40%)',
  },
  header: {
    position: 'relative', zIndex: 1,
    borderBottom: '1px solid rgba(83, 153, 205, 0.22)',
    padding: '30px 26px 26px',
  },
  headerInner: {
    maxWidth: 1440, margin: '0 auto',
    display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16,
  },
  kicker: {
    fontFamily: 'IBM Plex Mono, monospace', fontSize: 11, letterSpacing: '0.18em', color: '#3ecf8e', marginBottom: 6,
  },
  title: {
    fontSize: 32, fontWeight: 700, margin: 0, letterSpacing: '-0.01em', color: '#eef2f5',
  },
  headerTotal: { textAlign: 'right' },
  headerTotalLabel: { fontFamily: 'IBM Plex Mono, monospace', fontSize: 11, color: '#6d7885', letterSpacing: '0.05em' },
  headerTotalValue: { fontSize: 32, fontWeight: 600, color: '#eef2f5', fontFamily: 'IBM Plex Mono, monospace', marginTop: 2 },
  headerTotalChange: { fontSize: 12.5, marginTop: 4, fontFamily: 'IBM Plex Mono, monospace' },

  monthBar: {
    position: 'relative', zIndex: 1,
    borderBottom: '1px solid rgba(83, 153, 205, 0.22)', background: 'rgba(5, 20, 37, 0.88)',
  },
  monthBarInner: {
    maxWidth: 1440, margin: '0 auto', display: 'flex', overflowX: 'auto', WebkitOverflowScrolling: 'touch',
  },
  monthBtn: {
    background: 'none', border: 'none', borderRight: '1px solid #232d38', cursor: 'pointer',
    padding: '14px 22px', color: '#6d7885', fontFamily: '"Fraunces", serif', textAlign: 'left', flexShrink: 0,
  },
  monthBtnActive: {
    color: '#eef2f5', background: 'rgba(0,224,178,0.12)', boxShadow: 'inset 0 -2px 0 #3ecf8e',
  },

  main: { position: 'relative', zIndex: 1, maxWidth: 1440, margin: '0 auto', padding: '30px 26px 64px' },

  tabs: { display: 'flex', gap: 24, marginBottom: 26, borderBottom: '1px solid rgba(83, 153, 205, 0.22)', overflowX: 'auto', WebkitOverflowScrolling: 'touch' },
  tabBtn: {
    background: 'none', border: 'none', cursor: 'pointer', padding: '0 0 12px',
    fontFamily: 'IBM Plex Mono, monospace', fontSize: 12.5, letterSpacing: '0.04em', whiteSpace: 'nowrap', flexShrink: 0,
  },

  statGrid: {
    display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14, marginBottom: 24,
  },
  statCard: {
    background: 'linear-gradient(145deg, rgba(12, 36, 60, 0.96), rgba(6, 24, 43, 0.96))', border: '1px solid rgba(83, 153, 205, 0.28)', borderRadius: 16, padding: '20px 21px', boxShadow: '0 10px 28px rgba(0, 0, 0, 0.16)', transition: 'transform 180ms ease, border-color 180ms ease',
  },
  statLabel: { fontFamily: 'IBM Plex Mono, monospace', fontSize: 10.5, color: '#6d7885', letterSpacing: '0.06em', textTransform: 'uppercase' },
  statValue: { fontSize: 21, fontWeight: 600, marginTop: 7, fontFamily: '"Fraunces", serif' },
  statSub: { fontSize: 11.5, color: '#576270', marginTop: 5, fontFamily: 'IBM Plex Mono, monospace' },

  panel: {
    background: 'linear-gradient(145deg, rgba(10, 31, 53, 0.96), rgba(5, 23, 41, 0.96))', border: '1px solid rgba(83, 153, 205, 0.25)', borderRadius: 17, marginBottom: 20, overflow: 'hidden', boxShadow: '0 12px 32px rgba(0, 0, 0, 0.14)',
  },
  panelTitle: {
    padding: '16px 20px', fontFamily: 'IBM Plex Mono, monospace', fontSize: 12, letterSpacing: '0.05em',
    color: '#3ecf8e', borderBottom: '1px solid rgba(83, 153, 205, 0.22)', textTransform: 'uppercase',
  },

  twoCol: { display: 'grid', gridTemplateColumns: 'minmax(0, 1.1fr) minmax(0, 0.9fr)', gap: 20 },

  barTrack: { height: 7, background: '#061426', borderRadius: 4, overflow: 'hidden' },
  barFillBase: { height: '100%', borderRadius: 4 },

  noteRow: { display: 'flex', alignItems: 'baseline', gap: 8, flexWrap: 'wrap' },

  miniTable: { width: '100%', borderCollapse: 'collapse', fontSize: 12.5 },
  th: {
    textAlign: 'left', padding: '10px 14px', fontFamily: 'IBM Plex Mono, monospace', fontSize: 10.5,
    color: '#6d7885', letterSpacing: '0.05em', textTransform: 'uppercase', borderBottom: '1px solid rgba(83, 153, 205, 0.22)',
    position: 'sticky', top: 0, background: '#0b243c',
  },
  td: {
    padding: '9px 14px', borderBottom: '1px solid #1c2530', fontFamily: 'IBM Plex Mono, monospace', color: '#e4edf8',
    fontSize: 12.5,
  },

  footer: {
    position: 'relative', zIndex: 1, textAlign: 'center', padding: '20px', color: '#4a5560',
    fontFamily: 'IBM Plex Mono, monospace', fontSize: 11, borderTop: '1px solid #232d38',
  },
};
