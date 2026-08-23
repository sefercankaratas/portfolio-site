import React, { useState, useMemo, useEffect } from 'react';

const RAW_DATA = {"MART":{"report_date":"30.03.2026","sheet_name":"MART","summary":[{"category":"📈 Hisse Senetleri","value_try":283619.31,"pct":0.261360736144706,"platform":"Midas","comment":"20 pozisyon, BIST","clean_name":"Hisse Senetleri","key":"hisse"},{"category":"📊 Yatırım Fonları","value_try":340784.976533,"pct":0.314040014883758,"platform":"İş B./TEB/Midas","comment":"41 fon","clean_name":"Yatırım Fonları","key":"fon"},{"category":"🥇 Fiziki Altın","value_try":407569,"pct":0.375582797482166,"platform":"Midas","comment":"Çeyrek (25) + Bilezik (2)","clean_name":"Fiziki Altın","key":"altin"},{"category":"🔗 Bitcoin","value_try":30843.41,"pct":0.0284228050015811,"platform":"Midas","comment":"0.0101907 BTC","clean_name":"Bitcoin","key":"bitcoin"},{"category":"🌐 VOO (S&P 500 ETF)","value_try":22347.4875890186,"pct":0.0205936464877888,"platform":"Midas","comment":"$602.49","clean_name":"VOO (S&P 500 ETF)","key":"voo"}],"total_try":1085164.18412202,"stocks":[{"code":"AGESA","name":"Agesa Hayat ve Emeklilik","qty":1,"price":227.2,"market_value_try":227.2,"pct":0.000801073805588202,"sector":"Sigorta","platform":"Midas"},{"code":"AKSA","name":"Aksa Akrilik Kimya","qty":357,"price":11.09,"market_value_try":3959.13,"pct":0.0139593104573874,"sector":"Kimya","platform":"Midas"},{"code":"CLEBI","name":"Çelebi Hava Servisi","qty":6,"price":1772,"market_value_try":10632,"pct":0.037486869282631,"sector":"Havacılık","platform":"Midas"},{"code":"ENJSA","name":"Enerjisa Enerji","qty":163,"price":118.8,"market_value_try":19364.4,"pct":0.068276028173117,"sector":"Enerji","platform":"Midas"},{"code":"ENKAI","name":"Enka İnşaat ve Sanayi","qty":229,"price":94.75,"market_value_try":21697.75,"pct":0.0765030773116259,"sector":"İnşaat","platform":"Midas"},{"code":"EREGL","name":"Ereğli Demir ve Çelik","qty":522,"price":28.78,"market_value_try":15023.16,"pct":0.0529694540191921,"sector":"Metal","platform":"Midas"},{"code":"FROTO","name":"Ford Otomotiv Sanayi","qty":30,"price":102.5,"market_value_try":3075,"pct":0.0108419980289777,"sector":"Otomotiv","platform":"Midas"},{"code":"GWIND","name":"Galata Wind Enerji","qty":640,"price":29,"market_value_try":18560,"pct":0.0654398320057968,"sector":"Enerji","platform":"Midas"},{"code":"ISMEN","name":"İş Yatırım Menkul Değerler","qty":898,"price":40.72,"market_value_try":36566.56,"pct":0.128928315917559,"sector":"Finans","platform":"Midas"},{"code":"LOGO","name":"Logo Yazılım Sanayi","qty":12,"price":134.9,"market_value_try":1618.8,"pct":0.00570765086481594,"sector":"Teknoloji","platform":"Midas"},{"code":"MAVI","name":"Mavi Giyim Sanayi","qty":208,"price":42.8,"market_value_try":8902.4,"pct":0.0313885539034701,"sector":"Perakende","platform":"Midas"},{"code":"MGROS","name":"Migros Ticaret","qty":12,"price":617,"market_value_try":7404,"pct":0.0261054157419676,"sector":"Perakende","platform":"Midas"},{"code":"MPARK","name":"MLP Sağlık Hizmetleri","qty":3,"price":415,"market_value_try":1245,"pct":0.00438968700685436,"sector":"Sağlık","platform":"Midas"},{"code":"RYGYO","name":"Reysaş Gayrimenkul YO","qty":1124,"price":29.76,"market_value_try":33450.24,"pct":0.117940629641896,"sector":"GYO","platform":"Midas"},{"code":"RYSAS","name":"Reysaş Taşımacılık","qty":350,"price":19.08,"market_value_try":6678,"pct":0.0235456464512237,"sector":"Lojistik","platform":"Midas"},{"code":"SISE","name":"Türkiye Şişe ve Cam","qty":854,"price":44.62,"market_value_try":38105.48,"pct":0.134354321643332,"sector":"Cam/Sanayi","platform":"Midas"},{"code":"TABGD","name":"TAB Gıda Sanayi ve Ticaret","qty":37,"price":246.5,"market_value_try":9120.5,"pct":0.0321575424465986,"sector":"Gıda","platform":"Midas"},{"code":"TTRAK","name":"Türk Traktör","qty":24,"price":444.75,"market_value_try":10674,"pct":0.0376349551093683,"sector":"Tarım Mak.","platform":"Midas"},{"code":"TUPRS","name":"Tüpraş Petrol Rafinerileri","qty":129,"price":253.75,"market_value_try":32733.75,"pct":0.115414391213349,"sector":"Enerji","platform":"Midas"},{"code":"VESBE","name":"Vestel Beyaz Eşya","qty":649,"price":7.06,"market_value_try":4581.94,"pct":0.01615524697525,"sector":"Tüketim El.","platform":"Midas"}],"funds":[{"code":"BDS","name":"Pardus BIST 30 Dışı Hisse (TL)","qty":420,"unit_price":2.27776190476191,"market_value_try":956.66,"pct":0.00280722468969333,"platform":"Midas"},{"code":"KHA","name":"Pardus İkinci Hisse (TL)","qty":1085,"unit_price":2.9267465437788,"market_value_try":3175.52,"pct":0.00931825115152193,"platform":"Midas"},{"code":"TKM","name":"TEB Portföy Para Piyasası (TL)","qty":350192,"unit_price":0.185115,"market_value_try":64825.79208,"pct":0.190224911730293,"platform":"TEB"},{"code":"ZFB","name":"Ak Portföy Fintek ve Blokzinciri Değ.","qty":173,"unit_price":5.540647,"market_value_try":958.531931,"pct":0.00281271768712251,"platform":"İş Bankası"},{"code":"MKG","name":"Aktif Portföy Altın Katılım Fonu","qty":1501,"unit_price":17.15082,"market_value_try":25743.38082,"pct":0.0755414193486523,"platform":"İş Bankası"},{"code":"GPT","name":"Aktif Portföy Robotik Tekn. Değ.","qty":439,"unit_price":2.050812,"market_value_try":900.306468,"pct":0.00264186079198482,"platform":"İş Bankası"},{"code":"CPU","name":"Aktif Portföy Teknoloji Katılım","qty":228,"unit_price":2.571417,"market_value_try":586.283076,"pct":0.0017203900299966,"platform":"İş Bankası"},{"code":"URA","name":"Ata Portföy Enerji Değ.","qty":526,"unit_price":1.728355,"market_value_try":909.11473,"pct":0.00266770777059759,"platform":"İş Bankası"},{"code":"JET","name":"Ata Portföy Havacılık & Savunma Değ.","qty":1183,"unit_price":2.078265,"market_value_try":2458.587495,"pct":0.00721448322051228,"platform":"İş Bankası"},{"code":"AAV","name":"Ata Portföy İkinci Hisse (TL)","qty":10,"unit_price":57.371611,"market_value_try":573.71611,"pct":0.00168351350413607,"platform":"İş Bankası"},{"code":"RTG","name":"Ata Portföy Robotik Tekn. Değ.","qty":401,"unit_price":3.930952,"market_value_try":1576.311752,"pct":0.00462553181785394,"platform":"İş Bankası"},{"code":"GSP","name":"Azimut Portföy Kar Payı Hisse Y.","qty":1589,"unit_price":0.496494,"market_value_try":788.928966,"pct":0.00231503446550439,"platform":"İş Bankası"},{"code":"DMG","name":"Deniz Portföy Gümüş Fon Sepeti","qty":6424,"unit_price":7.131107,"market_value_try":45810.231368,"pct":0.134425618858125,"platform":"İş Bankası"},{"code":"DVT","name":"Deniz Portföy Metaverse Değ.","qty":132,"unit_price":6.790288,"market_value_try":896.318016,"pct":0.00263015707182504,"platform":"İş Bankası"},{"code":"DBH","name":"Deniz Portföy Eurobond (Döviz)","qty":37300,"unit_price":0.33797,"market_value_try":12606.281,"pct":0.0369918918616979,"platform":"İş Bankası"},{"code":"DHM","name":"Deniz Portföy ESG Sürdürülebilirlik","qty":786,"unit_price":4.65678,"market_value_try":3660.22908,"pct":0.0107405822792941,"platform":"İş Bankası"},{"code":"GID","name":"Garanti Portföy İnşaat Sektörü Değ.","qty":927,"unit_price":1.535299,"market_value_try":1423.222173,"pct":0.00417630550348566,"platform":"İş Bankası"},{"code":"GVI","name":"Garanti Portföy Üçüncü Fon Sepeti","qty":822,"unit_price":5.116143,"market_value_try":4205.469546,"pct":0.0123405368064773,"platform":"İş Bankası"},{"code":"HVS","name":"HSBC Hisse Senedi (TL) Fonu","qty":26523,"unit_price":1.414191,"market_value_try":37508.587893,"pct":0.110065262484856,"platform":"İş Bankası"},{"code":"GBG","name":"Inveo G-20 Ülkeleri Yabancı Hisse","qty":1913,"unit_price":0.443916,"market_value_try":849.211308,"pct":0.00249192706978902,"platform":"İş Bankası"},{"code":"GJB","name":"Inveo Gedik Portföy Birinci Fon Sepeti","qty":581,"unit_price":9.227671,"market_value_try":5361.276851,"pct":0.0157321396780554,"platform":"İş Bankası"},{"code":"KPH","name":"İş Portföy Kar Payı Hisse (TL)","qty":9008,"unit_price":1.260632,"market_value_try":11355.773056,"pct":0.033322399278069,"platform":"İş Bankası"},{"code":"IEV","name":"İş Portföy Taşımacılık Değ.","qty":538,"unit_price":4.390582,"market_value_try":2362.133116,"pct":0.00693144733089859,"platform":"İş Bankası"},{"code":"ITP","name":"İş Portföy Teknoloji Karma Fon","qty":97,"unit_price":9.805695,"market_value_try":951.152415,"pct":0.00279106322314034,"platform":"İş Bankası"},{"code":"IJC","name":"İş Portföy Yarı İletken Tekn. Değ.","qty":151,"unit_price":10.61723,"market_value_try":1603.20173,"pct":0.00470443781386811,"platform":"İş Bankası"},{"code":"IPV","name":"İş Portföy Eurobond (Döviz)","qty":11,"unit_price":70.642449,"market_value_try":777.066939,"pct":0.00228022651381392,"platform":"İş Bankası"},{"code":"TGE","name":"İş Portföy Emtia Yabancı BYF Fon Sep.","qty":1744,"unit_price":0.271527,"market_value_try":473.543088,"pct":0.00138956562233941,"platform":"İş Bankası"},{"code":"TTA","name":"İş Portföy Altın Fonu","qty":3873,"unit_price":0.62114,"market_value_try":2405.67522,"pct":0.00705921735304856,"platform":"İş Bankası"},{"code":"MAC","name":"Marmara Capital Hisse Senedi (TL)","qty":42966,"unit_price":0.716042,"market_value_try":30765.460572,"pct":0.0902782184971726,"platform":"İş Bankası"},{"code":"NHY","name":"Neo Portföy Birinci Hisse (TL)","qty":57,"unit_price":5.043542,"market_value_try":287.481894,"pct":0.000843587346263669,"platform":"İş Bankası"},{"code":"NPH","name":"Nurol Portföy Birinci Hisse Yoğun","qty":839,"unit_price":1.595212,"market_value_try":1338.382868,"pct":0.00392735290626991,"platform":"İş Bankası"},{"code":"OPH","name":"Osmanlı Portföy Birinci Hisse","qty":119,"unit_price":22.298954,"market_value_try":2653.575526,"pct":0.00778665642187733,"platform":"İş Bankası"},{"code":"OJT","name":"QNB Portföy Teknoloji Fon Sepeti","qty":2397,"unit_price":9.033867,"market_value_try":21654.179199,"pct":0.0635420593340127,"platform":"İş Bankası"},{"code":"OLD","name":"QNB Portföy Temiz Enerji ve Su Fon Sep.","qty":292,"unit_price":2.789842,"market_value_try":814.633864,"pct":0.00239046296080225,"platform":"İş Bankası"},{"code":"CPT","name":"Rota Portföy Çip Tekn. Değ.","qty":719,"unit_price":2.597705,"market_value_try":1867.749895,"pct":0.00548072838774081,"platform":"İş Bankası"},{"code":"AN1","name":"Strateji Portföy Birinci Değ.","qty":15,"unit_price":87.007969,"market_value_try":1305.119535,"pct":0.00382974492677971,"platform":"İş Bankası"},{"code":"TCD","name":"Tacirler Portföy Değişken Fon","qty":36,"unit_price":41.036829,"market_value_try":1477.325844,"pct":0.00433506740534656,"platform":"İş Bankası"},{"code":"YZG","name":"Yapı Kredi Portföy Gümüş Fon Sep.","qty":3020,"unit_price":13.292517,"market_value_try":40143.40134,"pct":0.117796863431017,"platform":"İş Bankası"},{"code":"YJK","name":"Yapı Kredi Robotik & Yarı İletken Fon","qty":322,"unit_price":4.015842,"market_value_try":1293.101124,"pct":0.00379447808162043,"platform":"İş Bankası"},{"code":"YTD","name":"Yapı Kredi Yabancı Fon Sepeti","qty":1747,"unit_price":0.69791,"market_value_try":1219.24877,"pct":0.00357776561163028,"platform":"İş Bankası"},{"code":"ZDZ","name":"Ziraat Portföy Agresif Değ.","qty":25,"unit_price":10.512395,"market_value_try":262.809875,"pct":0.000771189732815439,"platform":"İş Bankası"}],"gold":[{"type":"Çeyrek Altın","qty":25,"total_gram":40.2,"cost_try":149824,"current_value_try":282300,"profit_try":132476,"profit_pct":0.884210807347288},{"type":"Bilezik","qty":2,"total_gram":18.32,"cost_try":109672,"current_value_try":125269,"profit_try":15597,"profit_pct":0.14221496826902}],"gold_total":{"type":"TOPLAM ALTIN","qty":27,"total_gram":58.52,"cost_try":259496,"current_value_try":407569,"profit_try":148073,"profit_pct":0.570617658846379},"crypto_etf":[{"asset":"Bitcoin","type":"Kripto","qty":0.0101907,"avg_cost":2986867.58,"current_price":3026624,"currency":"TRY","total_value_try":30843.41,"profit_pct":0.0133},{"asset":"VOO","type":"ETF (S&P 500)","qty":0.83390021,"avg_cost":632.35,"current_price":602.49,"currency":"USD","total_value_try":22347.4875890186,"profit_pct":-0.0472}],"usd_try_rate":"44.48","display_name":"Mart"},"NİSAN":{"report_date":"30.04.2026","sheet_name":"NİSAN","summary":[{"category":"📈 Hisse Senetleri","value_try":327281.17,"pct":0.2928,"platform":"Midas","comment":"20 pozisyon, BIST","clean_name":"Hisse Senetleri","key":"hisse"},{"category":"📊 Yatırım Fonları","value_try":338252.57,"pct":0.3026,"platform":"İş B./TEB/Midas","comment":"41 fon","clean_name":"Yatırım Fonları","key":"fon"},{"category":"🥇 Fiziki Altın","value_try":392001,"pct":0.3507,"platform":"Midas","comment":"Çeyrek (25) + Bilezik (2)","clean_name":"Fiziki Altın","key":"altin"},{"category":"🔗 Bitcoin","value_try":35374,"pct":0.0316,"platform":"Midas","comment":"0.0102686 BTC","clean_name":"Bitcoin","key":"bitcoin"},{"category":"🌐 VOO (S&P 500 ETF)","value_try":24850.1,"pct":0.0222,"platform":"Midas","comment":"$551 ≈ @45.1 kur","clean_name":"VOO (S&P 500 ETF)","key":"voo"}],"total_try":1117758.84,"stocks":[{"code":"AGESA","name":"Agesa Hayat ve Emeklilik","qty":1,"price":229,"market_value_try":229,"pct":0.0007,"sector":"Sigorta","platform":"SERB"},{"code":"AKSA","name":"Aksa Akrilik Kimya","qty":524,"price":10.22,"market_value_try":5355.28,"pct":0.016363,"sector":"Kimya","platform":"SERB"},{"code":"CLEBI","name":"Çelebi Hava Servisi","qty":7,"price":1807,"market_value_try":12649,"pct":0.038649,"sector":"Havacılık","platform":"SERB"},{"code":"ENJSA","name":"Enerjisa Enerji","qty":163,"price":122.5,"market_value_try":19967.5,"pct":0.06101,"sector":"Enerji","platform":"SERB"},{"code":"ENKAI","name":"Enka İnşaat ve Sanayi","qty":254,"price":104.9,"market_value_try":26644.6,"pct":0.081412,"sector":"İnşaat","platform":"SERB"},{"code":"EREGL","name":"Ereğli Demir ve Çelik","qty":522,"price":33.72,"market_value_try":17601.84,"pct":0.053782,"sector":"Metal","platform":"SERB"},{"code":"FROTO","name":"Ford Otomotiv Sanayi","qty":30,"price":98.05,"market_value_try":2941.5,"pct":0.008988,"sector":"Otomotiv","platform":"SERB"},{"code":"GWIND","name":"Galata Wind Enerji","qty":740,"price":31.74,"market_value_try":23487.6,"pct":0.071766,"sector":"Enerji","platform":"SERB"},{"code":"ISMEN","name":"İş Yatırım Menkul Değerler","qty":948,"price":41.56,"market_value_try":39398.88,"pct":0.120382,"sector":"Finans","platform":"SERB"},{"code":"LOGO","name":"Logo Yazılım Sanayi","qty":39,"price":141.2,"market_value_try":5506.8,"pct":0.016826,"sector":"Teknoloji","platform":"SERB"},{"code":"MAVI","name":"Mavi Giyim Sanayi","qty":263,"price":43,"market_value_try":11309,"pct":0.034554,"sector":"Perakende","platform":"SERB"},{"code":"MGROS","name":"Migros Ticaret","qty":19,"price":626,"market_value_try":11894,"pct":0.036342,"sector":"Perakende","platform":"SERB"},{"code":"MPARK","name":"MLP Sağlık Hizmetleri","qty":10,"price":426,"market_value_try":4260,"pct":0.013016,"sector":"Sağlık","platform":"SERB"},{"code":"RYGYO","name":"Reysaş Gayrimenkul YO","qty":1187,"price":30.02,"market_value_try":35633.74,"pct":0.108878,"sector":"GYO","platform":"SERB"},{"code":"RYSAS","name":"Reysaş Taşımacılık","qty":351,"price":21.02,"market_value_try":7378.02,"pct":0.022543,"sector":"Lojistik","platform":"SERB"},{"code":"SISE","name":"Türkiye Şişe ve Cam","qty":854,"price":45.88,"market_value_try":39181.52,"pct":0.119718,"sector":"Cam/Sanayi","platform":"SERB"},{"code":"TABGD","name":"TAB Gıda Sanayi ve Ticaret","qty":37,"price":264.5,"market_value_try":9786.5,"pct":0.029902,"sector":"Gıda","platform":"SERB"},{"code":"TTRAK","name":"Türk Traktör","qty":24,"price":453,"market_value_try":10872,"pct":0.033219,"sector":"Tarım Mak.","platform":"SERB"},{"code":"TUPRS","name":"Tüpraş Petrol Rafinerileri","qty":140,"price":275.5,"market_value_try":38570,"pct":0.11785,"sector":"Enerji","platform":"SERB"},{"code":"VESBE","name":"Vestel Beyaz Eşya","qty":649,"price":7.11,"market_value_try":4614.39,"pct":0.014099,"sector":"Tüketim El.","platform":"SERB"}],"funds":[{"code":"BDS","name":"Pardus BIST 30 Dışı Hisse (TL)","qty":420,"unit_price":2.4506,"market_value_try":1029.26,"pct":0.003043,"platform":"Midas"},{"code":"KHA","name":"Pardus İkinci Hisse (TL)","qty":1085,"unit_price":3.2803,"market_value_try":3559.11,"pct":0.010522,"platform":"Midas"},{"code":"TKM","name":"TEB Portföy Para Piyasası (TL)","qty":222629,"unit_price":0.191049,"market_value_try":42533.05,"pct":0.125743,"platform":"TEB"},{"code":"ZFB","name":"Ak Portföy Fintek ve Blokzinciri Değ.","qty":173,"unit_price":6.5996,"market_value_try":1141.74,"pct":0.003375,"platform":"İş Bankası"},{"code":"MKG","name":"Aktif Portföy Altın Katılım Fonu","qty":1501,"unit_price":17.2022,"market_value_try":25820.48,"pct":0.076335,"platform":"İş Bankası"},{"code":"GPT","name":"Aktif Portföy Robotik Tekn. Değ.","qty":439,"unit_price":2.4519,"market_value_try":1076.37,"pct":0.003182,"platform":"İş Bankası"},{"code":"CPU","name":"Aktif Portföy Teknoloji Katılım","qty":228,"unit_price":3.1604,"market_value_try":720.58,"pct":0.00213,"platform":"İş Bankası"},{"code":"URA","name":"Ata Portföy Enerji Değ.","qty":526,"unit_price":1.9403,"market_value_try":1020.61,"pct":0.003017,"platform":"İş Bankası"},{"code":"JET","name":"Ata Portföy Havacılık & Savunma Değ.","qty":1183,"unit_price":2.1447,"market_value_try":2537.14,"pct":0.007501,"platform":"İş Bankası"},{"code":"AAV","name":"Ata Portföy İkinci Hisse (TL)","qty":10,"unit_price":61.7332,"market_value_try":617.33,"pct":0.001825,"platform":"İş Bankası"},{"code":"RTG","name":"Ata Portföy Robotik Tekn. Değ.","qty":401,"unit_price":4.9389,"market_value_try":1980.5,"pct":0.005855,"platform":"İş Bankası"},{"code":"GSP","name":"Azimut Portföy Kar Payı Hisse Y.","qty":1589,"unit_price":0.5431,"market_value_try":863.04,"pct":0.002551,"platform":"İş Bankası"},{"code":"DMG","name":"Deniz Portföy Gümüş Fon Sepeti","qty":6424,"unit_price":7.1498,"market_value_try":45930.62,"pct":0.135788,"platform":"İş Bankası"},{"code":"DVT","name":"Deniz Portföy Metaverse Değ.","qty":132,"unit_price":8.245,"market_value_try":1088.34,"pct":0.003218,"platform":"İş Bankası"},{"code":"DBH","name":"Deniz Portföy Eurobond (Döviz)","qty":37300,"unit_price":0.3527,"market_value_try":13156.42,"pct":0.038895,"platform":"İş Bankası"},{"code":"DHM","name":"Deniz Portföy ESG Sürdürülebilirlik","qty":786,"unit_price":5.1007,"market_value_try":4009.17,"pct":0.011853,"platform":"İş Bankası"},{"code":"GID","name":"Garanti Portföy İnşaat Sektörü Değ.","qty":927,"unit_price":1.6483,"market_value_try":1527.99,"pct":0.004517,"platform":"İş Bankası"},{"code":"GVI","name":"Garanti Portföy Üçüncü Fon Sepeti","qty":822,"unit_price":5.4119,"market_value_try":4448.57,"pct":0.013152,"platform":"İş Bankası"},{"code":"HVS","name":"HSBC Hisse Senedi (TL) Fonu","qty":26523,"unit_price":1.5749,"market_value_try":41770.97,"pct":0.12349,"platform":"İş Bankası"},{"code":"GBG","name":"Inveo G-20 Ülkeleri Yabancı Hisse","qty":1913,"unit_price":0.5091,"market_value_try":973.89,"pct":0.002879,"platform":"İş Bankası"},{"code":"GJB","name":"Inveo Gedik Portföy Birinci Fon Sepeti","qty":581,"unit_price":10.0688,"market_value_try":5849.95,"pct":0.017295,"platform":"İş Bankası"},{"code":"KPH","name":"İş Portföy Kar Payı Hisse (TL)","qty":9008,"unit_price":1.3311,"market_value_try":11990.68,"pct":0.035449,"platform":"İş Bankası"},{"code":"IEV","name":"İş Portföy Taşımacılık Değ.","qty":538,"unit_price":4.7957,"market_value_try":2580.08,"pct":0.007628,"platform":"İş Bankası"},{"code":"ITP","name":"İş Portföy Teknoloji Karma Fon","qty":97,"unit_price":11.153,"market_value_try":1081.84,"pct":0.003198,"platform":"İş Bankası"},{"code":"IJC","name":"İş Portföy Yarı İletken Tekn. Değ.","qty":151,"unit_price":14.2362,"market_value_try":2149.66,"pct":0.006355,"platform":"İş Bankası"},{"code":"IPV","name":"İş Portföy Eurobond (Döviz)","qty":11,"unit_price":72.9248,"market_value_try":802.17,"pct":0.002372,"platform":"İş Bankası"},{"code":"TGE","name":"İş Portföy Emtia Yabancı BYF Fon Sep.","qty":1744,"unit_price":0.2815,"market_value_try":490.85,"pct":0.001451,"platform":"İş Bankası"},{"code":"TTA","name":"İş Portföy Altın Fonu","qty":3873,"unit_price":0.6161,"market_value_try":2386.28,"pct":0.007055,"platform":"İş Bankası"},{"code":"MAC","name":"Marmara Capital Hisse Senedi (TL)","qty":42966,"unit_price":0.7636,"market_value_try":32808.97,"pct":0.096995,"platform":"İş Bankası"},{"code":"NHY","name":"Neo Portföy Birinci Hisse (TL)","qty":57,"unit_price":5.5227,"market_value_try":314.8,"pct":0.000931,"platform":"İş Bankası"},{"code":"NPH","name":"Nurol Portföy Birinci Hisse Yoğun","qty":839,"unit_price":1.7159,"market_value_try":1439.62,"pct":0.004256,"platform":"İş Bankası"},{"code":"OPH","name":"Osmanlı Portföy Birinci Hisse","qty":119,"unit_price":24.2484,"market_value_try":2885.57,"pct":0.008531,"platform":"İş Bankası"},{"code":"OJT","name":"QNB Portföy Teknoloji Fon Sepeti","qty":2397,"unit_price":10.9523,"market_value_try":26252.78,"pct":0.077613,"platform":"İş Bankası"},{"code":"OLD","name":"QNB Portföy Temiz Enerji ve Su Fon Sep.","qty":292,"unit_price":3.0883,"market_value_try":901.78,"pct":0.002666,"platform":"İş Bankası"},{"code":"CPT","name":"Rota Portföy Çip Tekn. Değ.","qty":719,"unit_price":3.3635,"market_value_try":2418.39,"pct":0.00715,"platform":"İş Bankası"},{"code":"AN1","name":"Strateji Portföy Birinci Değ.","qty":15,"unit_price":98.8313,"market_value_try":1482.47,"pct":0.004383,"platform":"İş Bankası"},{"code":"TCD","name":"Tacirler Portföy Değişken Fon","qty":36,"unit_price":45.4105,"market_value_try":1634.78,"pct":0.004833,"platform":"İş Bankası"},{"code":"YZG","name":"Yapı Kredi Portföy Gümüş Fon Sep.","qty":3020,"unit_price":13.8023,"market_value_try":41683.05,"pct":0.123231,"platform":"İş Bankası"},{"code":"YJK","name":"Yapı Kredi Robotik & Yarı İletken Fon","qty":322,"unit_price":4.9257,"market_value_try":1586.09,"pct":0.004689,"platform":"İş Bankası"},{"code":"YTD","name":"Yapı Kredi Yabancı Fon Sepeti","qty":1747,"unit_price":0.7981,"market_value_try":1394.29,"pct":0.004122,"platform":"İş Bankası"},{"code":"ZDZ","name":"Ziraat Portföy Agresif Değ.","qty":25,"unit_price":12.5315,"market_value_try":313.29,"pct":0.000926,"platform":"İş Bankası"}],"gold":[{"type":"Çeyrek Altın","qty":25,"total_gram":40.2,"cost_try":149824,"current_value_try":270600,"profit_try":120776,"profit_pct":0.806},{"type":"Bilezik","qty":2,"total_gram":18.32,"cost_try":109672,"current_value_try":121401,"profit_try":11729,"profit_pct":0.107}],"gold_total":{"type":"TOPLAM ALTIN","qty":27,"total_gram":58.52,"cost_try":259496,"current_value_try":392001,"profit_try":132505,"profit_pct":0.510624},"crypto_etf":[{"asset":"Bitcoin","type":"Kripto","qty":0.0102686,"avg_cost":"₺2.989.019","current_price":"₺3.444.871","currency":"TRY","total_value_try":35374,"profit_pct":0.1525},{"asset":"VOO","type":"ETF (S&P 500)","qty":0.8339,"avg_cost":"$632.35","current_price":"$660.75","currency":"USD","total_value_try":24850.1,"profit_pct":0.0449},{"asset":"QQQ","type":"ETF (NASDAQ 100)","qty":null,"avg_cost":"—","current_price":"$667.74","currency":"USD","total_value_try":null,"profit_pct":null}],"usd_try_rate":"45.1","display_name":"Nisan"},"MAYIS":{"report_date":"01.06.2026","sheet_name":"MAYIS","summary":[{"category":"📈 Hisse Senetleri","value_try":355671.58,"pct":0.311399057843557,"platform":"Midas","comment":"19 pozisyon, BIST","clean_name":"Hisse Senetleri","key":"hisse"},{"category":"📊 Yatırım Fonları","value_try":328282.238316,"pct":0.287419027740075,"platform":"İş B./TEB/Midas","comment":"37 fon","clean_name":"Yatırım Fonları","key":"fon"},{"category":"🥇 Fiziki Altın","value_try":387156,"pct":0.338964427909815,"platform":"Midas","comment":"Çeyrek (25) + Bilezik (2)","clean_name":"Fiziki Altın","key":"altin"},{"category":"🔗 Bitcoin","value_try":44382.23,"pct":0.0388577142064487,"platform":"Midas","comment":"0.0135031 BTC","clean_name":"Bitcoin","key":"bitcoin"},{"category":"🌐 VOO (S&P 500 ETF)","value_try":26680.9,"pct":0.0233597723001038,"platform":"Midas","comment":"$697.3","clean_name":"VOO (S&P 500 ETF)","key":"voo"}],"total_try":1142172.948316,"stocks":[{"code":"AGESA","name":"Agesa Hayat ve Emeklilik","qty":6,"price":229.5,"market_value_try":1377,"pct":0.00387154914092377,"sector":"Sigorta","platform":"Midas"},{"code":"AKSA","name":"Aksa Akrilik Kimya","qty":624,"price":10.47,"market_value_try":6533.28,"pct":0.0183688558979045,"sector":"Kimya","platform":"Midas"},{"code":"CLEBI","name":"Çelebi Hava Servisi","qty":11,"price":1659,"market_value_try":18249,"pct":0.0513085695517196,"sector":"Havacılık","platform":"Midas"},{"code":"ENJSA","name":"Enerjisa Enerji","qty":163,"price":111.9,"market_value_try":18239.7,"pct":0.0512824218342101,"sector":"Enerji","platform":"Midas"},{"code":"ENKAI","name":"Enka İnşaat ve Sanayi","qty":304,"price":98.5,"market_value_try":29944,"pct":0.0841900272155566,"sector":"İnşaat","platform":"Midas"},{"code":"EREGL","name":"Ereğli Demir ve Çelik","qty":522,"price":40,"market_value_try":20880,"pct":0.0587058431826349,"sector":"Metal","platform":"Midas"},{"code":"FROTO","name":"Ford Otomotiv Sanayi","qty":30,"price":85.2,"market_value_try":2556,"pct":0.00718640494132255,"sector":"Otomotiv","platform":"Midas"},{"code":"GWIND","name":"Galata Wind Enerji","qty":923,"price":26.96,"market_value_try":24884.08,"pct":0.0699636445509647,"sector":"Enerji","platform":"Midas"},{"code":"ISMEN","name":"İş Yatırım Menkul Değerler","qty":983,"price":37.5,"market_value_try":36862.5,"pct":0.10364196093486,"sector":"Finans","platform":"Midas"},{"code":"LOGO","name":"Logo Yazılım Sanayi","qty":55,"price":163,"market_value_try":8965,"pct":0.0252058373626591,"sector":"Teknoloji","platform":"Midas"},{"code":"MAVI","name":"Mavi Giyim Sanayi","qty":268,"price":41.24,"market_value_try":11052.32,"pct":0.0310745098048036,"sector":"Perakende","platform":"Midas"},{"code":"MGROS","name":"Migros Ticaret","qty":22,"price":664,"market_value_try":14608,"pct":0.0410715975676212,"sector":"Perakende","platform":"Midas"},{"code":"MPARK","name":"MLP Sağlık Hizmetleri","qty":25,"price":460.5,"market_value_try":11512.5,"pct":0.0323683438524945,"sector":"Sağlık","platform":"Midas"},{"code":"RYGYO","name":"Reysaş Gayrimenkul YO","qty":1226,"price":34,"market_value_try":41684,"pct":0.117198006093149,"sector":"GYO","platform":"Midas"},{"code":"RYSAS","name":"Reysaş Taşımacılık","qty":406,"price":22.2,"market_value_try":9013.2,"pct":0.0253413556405041,"sector":"Lojistik","platform":"Midas"},{"code":"SISE","name":"Türkiye Şişe ve Cam","qty":911,"price":45.5,"market_value_try":41450.5,"pct":0.116541501572884,"sector":"Cam/Sanayi","platform":"Midas"},{"code":"TABGD","name":"TAB Gıda Sanayi ve Ticaret","qty":42,"price":275,"market_value_try":11550,"pct":0.0324737781972909,"sector":"Gıda","platform":"Midas"},{"code":"TTRAK","name":"Türk Traktör","qty":24,"price":450,"market_value_try":10800,"pct":0.0303650913013629,"sector":"Tarım Mak.","platform":"Midas"},{"code":"TUPRS","name":"Tüpraş Petrol Rafinerileri","qty":145,"price":244.9,"market_value_try":35510.5,"pct":0.099840701357134,"sector":"Enerji","platform":"Midas"}],"funds":[{"code":"HVS","name":"HSBC Hisse Senedi (TL) Fonu","qty":637,"unit_price":1.5652,"market_value_try":997.0324,"pct":0.00303711953809779,"platform":"Midas"},{"code":"MAC","name":"Marmara Capital Hisse Senedi (TL)","qty":1693,"unit_price":0.79918,"market_value_try":1353.01174,"pct":0.00412148932254327,"platform":"Midas"},{"code":"GO9","name":"One Portföy Birinci Hisse (TL)","qty":777,"unit_price":2.5295,"market_value_try":1965.4215,"pct":0.00598698702093079,"platform":"Midas"},{"code":"OPH","name":"Osmanlı Portföy Birinci Hisse","qty":41,"unit_price":24.9805,"market_value_try":1024.2005,"pct":0.003119877899133,"platform":"Midas"},{"code":"BDS","name":"Pardus BIST 30 Dışı Hisse (TL)","qty":420,"unit_price":2.3848,"market_value_try":1001.616,"pct":0.00305108191395923,"platform":"Midas"},{"code":"KHA","name":"Pardus İkinci Hisse (TL)","qty":1085,"unit_price":3.2465,"market_value_try":3522.4525,"pct":0.010729951513884,"platform":"Midas"},{"code":"TKM","name":"TEB Portföy Para Piyasası (TL)","qty":545618,"unit_price":0.197532,"market_value_try":107777.014776,"pct":0.328305958095288,"platform":"TEB"},{"code":"ZFB","name":"Ak Portföy Fintek ve Blokzinciri Değ.","qty":173,"unit_price":7.1044,"market_value_try":1229.0612,"pct":0.0037439162298416,"platform":"İş Bankası"},{"code":"MKG","name":"Aktif Portföy Altın Katılım Fonu","qty":1501,"unit_price":17.4196,"market_value_try":26146.8196,"pct":0.0796473782259015,"platform":"İş Bankası"},{"code":"GPT","name":"Aktif Portföy Robotik Tekn. Değ.","qty":439,"unit_price":2.7115,"market_value_try":1190.3485,"pct":0.00362599117791498,"platform":"İş Bankası"},{"code":"CPU","name":"Aktif Portföy Teknoloji Katılım","qty":228,"unit_price":3.6373,"market_value_try":829.3044,"pct":0.00252619332758942,"platform":"İş Bankası"},{"code":"URA","name":"Ata Portföy Enerji Değ.","qty":526,"unit_price":1.9308,"market_value_try":1015.6008,"pct":0.00309368184282452,"platform":"İş Bankası"},{"code":"JET","name":"Ata Portföy Havacılık & Savunma Değ.","qty":1183,"unit_price":2.1633,"market_value_try":2559.1839,"pct":0.00779568188985164,"platform":"İş Bankası"},{"code":"RTG","name":"Ata Portföy Robotik Tekn. Değ.","qty":401,"unit_price":5.5147,"market_value_try":2211.3947,"pct":0.00673626057670334,"platform":"İş Bankası"},{"code":"DMG","name":"Deniz Portföy Gümüş Fon Sepeti","qty":6424,"unit_price":7.63,"market_value_try":49015.12,"pct":0.149307864633294,"platform":"İş Bankası"},{"code":"DVT","name":"Deniz Portföy Metaverse Değ.","qty":132,"unit_price":9.4754,"market_value_try":1250.7528,"pct":0.0038099922993581,"platform":"İş Bankası"},{"code":"DBH","name":"Deniz Portföy Eurobond (Döviz)","qty":37300,"unit_price":0.3562,"market_value_try":13286.26,"pct":0.0404720647335505,"platform":"İş Bankası"},{"code":"DHM","name":"Deniz Portföy ESG Sürdürülebilirlik","qty":786,"unit_price":5.1541,"market_value_try":4051.1226,"pct":0.0123403648664673,"platform":"İş Bankası"},{"code":"GID","name":"Garanti Portföy İnşaat Sektörü Değ.","qty":927,"unit_price":1.6465,"market_value_try":1526.3055,"pct":0.0046493697247513,"platform":"İş Bankası"},{"code":"GVI","name":"Garanti Portföy Üçüncü Fon Sepeti","qty":822,"unit_price":5.37,"market_value_try":4414.14,"pct":0.01344617370298,"platform":"İş Bankası"},{"code":"GBG","name":"Inveo G-20 Ülkeleri Yabancı Hisse","qty":1913,"unit_price":0.5521,"market_value_try":1056.1673,"pct":0.00321725386489947,"platform":"İş Bankası"},{"code":"GJB","name":"Inveo Gedik Portföy Birinci Fon Sepeti","qty":581,"unit_price":10.5398,"market_value_try":6123.6238,"pct":0.0186535337135891,"platform":"İş Bankası"},{"code":"IEV","name":"İş Portföy Taşımacılık Değ.","qty":538,"unit_price":4.8632,"market_value_try":2616.4016,"pct":0.00796997612000405,"platform":"İş Bankası"},{"code":"ITP","name":"İş Portföy Teknoloji Karma Fon","qty":97,"unit_price":12.1952,"market_value_try":1182.9344,"pct":0.00360340664809688,"platform":"İş Bankası"},{"code":"IJC","name":"İş Portföy Yarı İletken Tekn. Değ.","qty":151,"unit_price":17.1497,"market_value_try":2589.6047,"pct":0.00788834849330862,"platform":"İş Bankası"},{"code":"IPV","name":"İş Portföy Eurobond (Döviz)","qty":11,"unit_price":73.4798,"market_value_try":808.2778,"pct":0.00246214295402105,"platform":"İş Bankası"},{"code":"TGE","name":"İş Portföy Emtia Yabancı BYF Fon Sep.","qty":1744,"unit_price":0.2917,"market_value_try":508.7248,"pct":0.00154965679108813,"platform":"İş Bankası"},{"code":"TTA","name":"İş Portföy Altın Fonu","qty":3873,"unit_price":0.6222,"market_value_try":2409.7806,"pct":0.00734057563504358,"platform":"İş Bankası"},{"code":"OJT","name":"QNB Portföy Teknoloji Fon Sepeti","qty":2397,"unit_price":12.2532,"market_value_try":29370.9204,"pct":0.0894685029280443,"platform":"İş Bankası"},{"code":"OLD","name":"QNB Portföy Temiz Enerji ve Su Fon Sep.","qty":292,"unit_price":3.2186,"market_value_try":939.8312,"pct":0.00286287556957416,"platform":"İş Bankası"},{"code":"CPT","name":"Rota Portföy Çip Tekn. Değ.","qty":719,"unit_price":3.7045,"market_value_try":2663.5355,"pct":0.00811355348880044,"platform":"İş Bankası"},{"code":"AN1","name":"Strateji Portföy Birinci Değ.","qty":15,"unit_price":101.5889,"market_value_try":1523.8335,"pct":0.00464183961891103,"platform":"İş Bankası"},{"code":"TCD","name":"Tacirler Portföy Değişken Fon","qty":36,"unit_price":46.3144,"market_value_try":1667.3184,"pct":0.00507891748439665,"platform":"İş Bankası"},{"code":"YZG","name":"Yapı Kredi Portföy Gümüş Fon Sep.","qty":3020,"unit_price":14.8428,"market_value_try":44825.256,"pct":0.136544871358078,"platform":"İş Bankası"},{"code":"YJK","name":"Yapı Kredi Robotik & Yarı İletken Fon","qty":322,"unit_price":5.5261,"market_value_try":1779.4042,"pct":0.00542034868876205,"platform":"İş Bankası"},{"code":"YTD","name":"Yapı Kredi Yabancı Fon Sepeti","qty":1747,"unit_price":0.8831,"market_value_try":1542.7757,"pct":0.00469954057799175,"platform":"İş Bankası"},{"code":"ZDZ","name":"Ziraat Portföy Agresif Değ.","qty":25,"unit_price":12.3074,"market_value_try":307.685,"pct":0.000937257530527212,"platform":"İş Bankası"}],"gold":[{"type":"Çeyrek Altın","qty":25,"total_gram":40.2,"cost_try":149824,"current_value_try":266900,"profit_try":117076,"profit_pct":0.781423536950021},{"type":"Bilezik","qty":2,"total_gram":18.32,"cost_try":109672,"current_value_try":120256,"profit_try":10584,"profit_pct":0.0965059449996353}],"gold_total":{"type":"TOPLAM ALTIN","qty":27,"total_gram":58.52,"cost_try":259496,"current_value_try":387156,"profit_try":127660,"profit_pct":0.491953633196658},"crypto_etf":[{"asset":"Bitcoin","type":"Kripto","qty":0.0135031,"avg_cost":"—","current_price":3286818,"currency":"TRY","total_value_try":44382.23,"profit_pct":0.0637},{"asset":"VOO","type":"ETF (S&P 500)","qty":0.83390021,"avg_cost":"—","current_price":697.3,"currency":"USD","total_value_try":26680.9,"profit_pct":0.1038}],"usd_try_rate":"45.8971","display_name":"Mayıs"},"HAZİRAN":{"report_date":"02.07.2026","sheet_name":"HAZİRAN","summary":[{"category":"📈 Hisse Senetleri","value_try":410208.35,"pct":0.374881057330689,"platform":"Midas","comment":"19 pozisyon, BIST","clean_name":"Hisse Senetleri","key":"hisse"},{"category":"📊 Yatırım Fonları","value_try":234800.558603,"pct":0.214579448884766,"platform":"İş B./TEB/Midas","comment":"36 fon","clean_name":"Yatırım Fonları","key":"fon"},{"category":"🥇 Fiziki Altın","value_try":363993,"pct":0.332645790123408,"platform":"Fiziksel","comment":"Çeyrek (25) + Bilezik (2)","clean_name":"Fiziki Altın","key":"altin"},{"category":"🔗 Bitcoin","value_try":58622.1,"pct":0.0535735433736182,"platform":"Midas","comment":"0.0205038 BTC","clean_name":"Bitcoin","key":"bitcoin"},{"category":"🌐 VOO (S&P 500 ETF)","value_try":26611.995,"pct":0.0243201602875198,"platform":"Midas","comment":"$681.78","clean_name":"VOO (S&P 500 ETF)","key":"voo"}],"total_try":1094236.003603,"stocks":[{"code":"AGESA","name":"Agesa Hayat ve Emeklilik","qty":6,"price":244.8,"market_value_try":1468.8,"pct":0.00358061945838011,"sector":"Sigorta","platform":"Midas"},{"code":"AKSA","name":"Aksa Akrilik Kimya","qty":724,"price":11.91,"market_value_try":8622.84,"pct":0.021020635001701,"sector":"Kimya","platform":"Midas"},{"code":"CLEBI","name":"Çelebi Hava Servisi","qty":12,"price":1590,"market_value_try":19080,"pct":0.0465129488466044,"sector":"Havacılık","platform":"Midas"},{"code":"ENJSA","name":"Enerjisa Enerji","qty":173,"price":102.9,"market_value_try":17801.7,"pct":0.0433967275410167,"sector":"Enerji","platform":"Midas"},{"code":"ENKAI","name":"Enka İnşaat ve Sanayi","qty":409,"price":93.55,"market_value_try":38261.95,"pct":0.0932744299329841,"sector":"İnşaat","platform":"Midas"},{"code":"EREGL","name":"Ereğli Demir ve Çelik","qty":522,"price":40.44,"market_value_try":21109.68,"pct":0.051460873480513,"sector":"Metal","platform":"Midas"},{"code":"FROTO","name":"Ford Otomotiv Sanayi","qty":40,"price":85.2,"market_value_try":3408,"pct":0.00830797325310419,"sector":"Otomotiv","platform":"Midas"},{"code":"GWIND","name":"Galata Wind Enerji","qty":1004,"price":25.44,"market_value_try":25541.76,"pct":0.0622653341893211,"sector":"Enerji","platform":"Midas"},{"code":"ISMEN","name":"İş Yatırım Menkul Değerler","qty":1033,"price":36.08,"market_value_try":37270.64,"pct":0.0908578287107028,"sector":"Finans","platform":"Midas"},{"code":"LOGO","name":"Logo Yazılım Sanayi","qty":71,"price":137.4,"market_value_try":9755.4,"pct":0.0237815734370107,"sector":"Teknoloji","platform":"Midas"},{"code":"MAVI","name":"Mavi Giyim Sanayi","qty":368,"price":38.44,"market_value_try":14145.92,"pct":0.0344847197771571,"sector":"Perakende","platform":"Midas"},{"code":"MGROS","name":"Migros Ticaret","qty":23,"price":659,"market_value_try":15157,"pct":0.0369495160203346,"sector":"Perakende","platform":"Midas"},{"code":"MPARK","name":"MLP Sağlık Hizmetleri","qty":47,"price":427,"market_value_try":20069,"pct":0.0489239187841983,"sector":"Sağlık","platform":"Midas"},{"code":"RYGYO","name":"Reysaş Gayrimenkul YO","qty":1470,"price":30,"market_value_try":44100,"pct":0.107506344032246,"sector":"GYO","platform":"Midas"},{"code":"RYSAS","name":"Reysaş Taşımacılık","qty":406,"price":21.7,"market_value_try":8810.2,"pct":0.0214773785077754,"sector":"Lojistik","platform":"Midas"},{"code":"SISE","name":"Türkiye Şişe ve Cam","qty":931,"price":44.86,"market_value_try":41764.66,"pct":0.101813285858272,"sector":"Cam/Sanayi","platform":"Midas"},{"code":"TABGD","name":"TAB Gıda Sanayi ve Ticaret","qty":87,"price":226.1,"market_value_try":19670.7,"pct":0.0479529487880976,"sector":"Gıda","platform":"Midas"},{"code":"TTRAK","name":"Türk Traktör","qty":24,"price":438.75,"market_value_try":10530,"pct":0.0256698821464751,"sector":"Tarım Mak.","platform":"Midas"},{"code":"TUPRS","name":"Tüpraş Petrol Rafinerileri","qty":227,"price":236.3,"market_value_try":53640.1,"pct":0.130763062234106,"sector":"Enerji","platform":"Midas"}],"funds":[{"code":"HVS","name":"HSBC Hisse Senedi (TL) Fonu","qty":1282,"unit_price":1.58732,"market_value_try":2034.94424,"pct":0.00866669249897602,"platform":"Midas"},{"code":"MAC","name":"Marmara Capital Hisse Senedi (TL)","qty":10336,"unit_price":0.794512,"market_value_try":8212.076032,"pct":0.0349746869464862,"platform":"Midas"},{"code":"GO9","name":"One Portföy Birinci Hisse (TL)","qty":777,"unit_price":2.566675,"market_value_try":1994.306475,"pct":0.00849361895416938,"platform":"Midas"},{"code":"OPH","name":"Osmanlı Portföy Birinci Hisse","qty":221,"unit_price":25.131315,"market_value_try":5554.020615,"pct":0.0236542052882878,"platform":"Midas"},{"code":"KHA","name":"Pardus İkinci Hisse (TL)","qty":1279,"unit_price":3.658927,"market_value_try":4679.767633,"pct":0.0199308198449073,"platform":"Midas"},{"code":"TKM","name":"TEB Portföy Para Piyasası (TL)","qty":65666,"unit_price":0.310802067005756,"market_value_try":20409.128532,"pct":0.0869211242657548,"platform":"TEB"},{"code":"ZFB","name":"Ak Portföy Fintek ve Blokzinciri Değ.","qty":173,"unit_price":6.984927,"market_value_try":1208.392371,"pct":0.00514646293087891,"platform":"İş Bankası"},{"code":"MKG","name":"Aktif Portföy Altın Katılım Fonu","qty":1501,"unit_price":15.741487,"market_value_try":23627.971987,"pct":0.100629964969334,"platform":"İş Bankası"},{"code":"GPT","name":"Aktif Portföy Robotik Tekn. Değ.","qty":439,"unit_price":2.876625,"market_value_try":1262.838375,"pct":0.00537834484940559,"platform":"İş Bankası"},{"code":"CPU","name":"Aktif Portföy Teknoloji Katılım","qty":228,"unit_price":3.84766,"market_value_try":877.26648,"pct":0.00373621973141588,"platform":"İş Bankası"},{"code":"URA","name":"Ata Portföy Enerji Değ.","qty":526,"unit_price":1.825566,"market_value_try":960.247716,"pct":0.00408963130970904,"platform":"İş Bankası"},{"code":"JET","name":"Ata Portföy Havacılık & Savunma Değ.","qty":1183,"unit_price":2.258955,"market_value_try":2672.343765,"pct":0.0113813347842941,"platform":"İş Bankası"},{"code":"RTG","name":"Ata Portföy Robotik Tekn. Değ.","qty":401,"unit_price":5.994289,"market_value_try":2403.709889,"pct":0.0102372409303514,"platform":"İş Bankası"},{"code":"DMG","name":"Deniz Portföy Gümüş Fon Sepeti","qty":6424,"unit_price":6.11056,"market_value_try":39254.23744,"pct":0.167181192726083,"platform":"İş Bankası"},{"code":"DVT","name":"Deniz Portföy Metaverse Değ.","qty":132,"unit_price":9.571197,"market_value_try":1263.398004,"pct":0.00538072827218503,"platform":"İş Bankası"},{"code":"DBH","name":"Deniz Portföy Eurobond (Döviz)","qty":37300,"unit_price":0.37127,"market_value_try":13848.371,"pct":0.058979293245272,"platform":"İş Bankası"},{"code":"DHM","name":"Deniz Portföy ESG Sürdürülebilirlik","qty":786,"unit_price":5.206581,"market_value_try":4092.372666,"pct":0.0174291436542933,"platform":"İş Bankası"},{"code":"GVI","name":"Garanti Portföy Üçüncü Fon Sepeti","qty":822,"unit_price":5.485515,"market_value_try":4509.09333,"pct":0.0192039293127235,"platform":"İş Bankası"},{"code":"GID","name":"Garanti Portföy İnşaat Sektörü Değ.","qty":927,"unit_price":1.673892,"market_value_try":1551.697884,"pct":0.00660857833231822,"platform":"İş Bankası"},{"code":"GBG","name":"Inveo G-20 Ülkeleri Yabancı Hisse","qty":1913,"unit_price":0.577315,"market_value_try":1104.403595,"pct":0.00470358163358258,"platform":"İş Bankası"},{"code":"GJB","name":"Inveo Gedik Portföy Birinci Fon Sepeti","qty":581,"unit_price":10.604531,"market_value_try":6161.232511,"pct":0.0262402804646534,"platform":"İş Bankası"},{"code":"OJT","name":"QNB Portföy Teknoloji Fon Sepeti","qty":2397,"unit_price":12.735883,"market_value_try":30527.911551,"pct":0.130016349759272,"platform":"İş Bankası"},{"code":"OLD","name":"QNB Portföy Temiz Enerji ve Su Fon Sep.","qty":292,"unit_price":3.259094,"market_value_try":951.655448,"pct":0.00405303741039669,"platform":"İş Bankası"},{"code":"CPT","name":"Rota Portföy Çip Tekn. Değ.","qty":719,"unit_price":4.071876,"market_value_try":2927.678844,"pct":0.0124687899441931,"platform":"İş Bankası"},{"code":"AN1","name":"Strateji Portföy Birinci Değ.","qty":15,"unit_price":108.334807,"market_value_try":1625.022105,"pct":0.00692086132447232,"platform":"İş Bankası"},{"code":"TCD","name":"Tacirler Portföy Değişken Fon","qty":36,"unit_price":48.201164,"market_value_try":1735.241904,"pct":0.00739028013529534,"platform":"İş Bankası"},{"code":"YZG","name":"Yapı Kredi Portföy Gümüş Fon Sep.","qty":3020,"unit_price":11.676102,"market_value_try":35261.82804,"pct":0.15017778598909,"platform":"İş Bankası"},{"code":"YJK","name":"Yapı Kredi Robotik & Yarı İletken Fon","qty":322,"unit_price":5.873701,"market_value_try":1891.331722,"pct":0.00805505631354931,"platform":"İş Bankası"},{"code":"YTD","name":"Yapı Kredi Yabancı Fon Sepeti","qty":1747,"unit_price":0.951671,"market_value_try":1662.569237,"pct":0.00708077206839642,"platform":"İş Bankası"},{"code":"ZDZ","name":"Ziraat Portföy Agresif Değ.","qty":25,"unit_price":12.289535,"market_value_try":307.238375,"pct":0.00130850785376315,"platform":"İş Bankası"},{"code":"IEV","name":"İş Portföy Taşımacılık Değ.","qty":538,"unit_price":5.207526,"market_value_try":2801.648988,"pct":0.0119320371496093,"platform":"İş Bankası"},{"code":"ITP","name":"İş Portföy Teknoloji Karma Fon","qty":97,"unit_price":12.773597,"market_value_try":1239.038909,"pct":0.00527698450281357,"platform":"İş Bankası"},{"code":"IJC","name":"İş Portföy Yarı İletken Tekn. Değ.","qty":151,"unit_price":17.973665,"market_value_try":2714.023415,"pct":0.0115588456481863,"platform":"İş Bankası"},{"code":"IPV","name":"İş Portföy Eurobond (Döviz)","qty":11,"unit_price":75.610292,"market_value_try":831.713212,"pct":0.0035422113854774,"platform":"İş Bankası"},{"code":"TGE","name":"İş Portföy Emtia Yabancı BYF Fon Sep.","qty":1744,"unit_price":0.262252,"market_value_try":457.367488,"pct":0.00194789778491675,"platform":"İş Bankası"},{"code":"TTA","name":"İş Portföy Altın Fonu","qty":3873,"unit_price":0.564025,"market_value_try":2184.468825,"pct":0.00930350778548825,"platform":"İş Bankası"}],"gold":[{"type":"Çeyrek Altın","qty":25,"total_gram":40.2,"cost_try":149824,"current_value_try":251750,"profit_try":101926,"profit_pct":0.680304891072191},{"type":"Bilezik","qty":2,"total_gram":18.32,"cost_try":109672,"current_value_try":112243,"profit_try":2571,"profit_pct":0.0234426289299001}],"gold_total":{"type":"TOPLAM ALTIN","qty":27,"total_gram":58.52,"cost_try":259496,"current_value_try":363993,"profit_try":104497,"profit_pct":0.402692141690045},"crypto_etf":[{"asset":"Bitcoin","type":"Kripto","qty":0.0205038,"avg_cost":"—","current_price":2859085,"currency":"TRY","total_value_try":58622.1,"profit_pct":null},{"asset":"VOO","type":"ETF (S&P 500)","qty":0.835828343,"avg_cost":"—","current_price":681.78,"currency":"USD","total_value_try":26611.995,"profit_pct":null}],"usd_try_rate":"46.7","display_name":"Haziran"},"TEMMUZ":{"report_date":"01.08.2026","sheet_name":"TEMMUZ","summary":[{"category":"📈 Hisse Senetleri","value_try":485116.19,"pct":0.408083473597805,"platform":"Midas","comment":"18 pozisyon, BIST","clean_name":"Hisse Senetleri","key":"hisse"},{"category":"📊 Yatırım Fonları","value_try":257585.277198,"pct":0.216682718147612,"platform":"İş B./TEB/Midas","comment":"36 fon","clean_name":"Yatırım Fonları","key":"fon"},{"category":"🥇 Fiziki Altın","value_try":357887,"pct":0.301057299521374,"platform":"Fiziksel","comment":"Çeyrek (25) + Bilezik (2)","clean_name":"Fiziki Altın","key":"altin"},{"category":"🔗 Bitcoin","value_try":60988.69,"pct":0.051304155537212,"platform":"Midas","comment":"0.0205038 BTC","clean_name":"Bitcoin","key":"bitcoin"},{"category":"🌐 VOO (S&P 500 ETF)","value_try":27189.9,"pct":0.0228723531959982,"platform":"Midas","comment":"$684.58","clean_name":"VOO (S&P 500 ETF)","key":"voo"}],"total_try":1188767.057198,"stocks":[{"code":"AGESA","name":"Agesa Hayat ve Emeklilik","qty":6,"price":242.9,"market_value_try":1457.4,"pct":0.00300422873951084,"sector":"Sigorta","platform":"Midas"},{"code":"AKSA","name":"Aksa Akrilik Kimya","qty":724,"price":13,"market_value_try":9412,"pct":0.0194015375986524,"sector":"Kimya","platform":"Midas"},{"code":"CLEBI","name":"Çelebi Hava Servisi","qty":28,"price":1443,"market_value_try":40404,"pct":0.0832872636141045,"sector":"Havacılık","platform":"Midas"},{"code":"ENJSA","name":"Enerjisa Enerji","qty":173,"price":108.9,"market_value_try":18839.7,"pct":0.038835438578127,"sector":"Enerji","platform":"Midas"},{"code":"ENKAI","name":"Enka İnşaat ve Sanayi","qty":494,"price":87.5992,"market_value_try":43274,"pct":0.0892033720828818,"sector":"İnşaat","platform":"Midas"},{"code":"EREGL","name":"Ereğli Demir ve Çelik","qty":522,"price":42.54,"market_value_try":22205.88,"pct":0.045774353562597,"sector":"Metal","platform":"Midas"},{"code":"FROTO","name":"Ford Otomotiv Sanayi","qty":40,"price":80.1,"market_value_try":3204,"pct":0.00660460332193819,"sector":"Otomotiv","platform":"Midas"},{"code":"GWIND","name":"Galata Wind Enerji","qty":1249,"price":24.2594,"market_value_try":30300,"pct":0.0624592636250709,"sector":"Enerji","platform":"Midas"},{"code":"ISMEN","name":"İş Yatırım Menkul Değerler","qty":1103,"price":34.5394,"market_value_try":38097,"pct":0.0785317018588887,"sector":"Finans","platform":"Midas"},{"code":"LOGO","name":"Logo Yazılım Sanayi","qty":71,"price":136,"market_value_try":9656,"pct":0.0199045098865903,"sector":"Teknoloji","platform":"Midas"},{"code":"MAVI","name":"Mavi Giyim Sanayi","qty":488,"price":39.12,"market_value_try":19090.56,"pct":0.0393525518082586,"sector":"Perakende","platform":"Midas"},{"code":"MGROS","name":"Migros Ticaret","qty":25,"price":625.5,"market_value_try":15637.5,"pct":0.0322345457074933,"sector":"Perakende","platform":"Midas"},{"code":"MPARK","name":"MLP Sağlık Hizmetleri","qty":67,"price":405,"market_value_try":27135,"pct":0.0559350534147294,"sector":"Sağlık","platform":"Midas"},{"code":"RYGYO","name":"Reysaş Gayrimenkul YO","qty":1656,"price":38.3,"market_value_try":63424.8,"pct":0.130741462163941,"sector":"GYO","platform":"Midas"},{"code":"RYSAS","name":"Reysaş Taşımacılık","qty":407,"price":22.2,"market_value_try":9035.4,"pct":0.018625228731286,"sector":"Lojistik","platform":"Midas"},{"code":"SISE","name":"Türkiye Şişe ve Cam","qty":951,"price":41.7392,"market_value_try":39694,"pct":0.0818236967106787,"sector":"Cam/Sanayi","platform":"Midas"},{"code":"TABGD","name":"TAB Gıda Sanayi ve Ticaret","qty":112,"price":243.1,"market_value_try":27227.2,"pct":0.0561251109759911,"sector":"Gıda","platform":"Midas"},{"code":"TUPRS","name":"Tüpraş Petrol Rafinerileri","qty":227,"price":295.25,"market_value_try":67021.75,"pct":0.138156077619261,"sector":"Enerji","platform":"Midas"}],"funds":[{"code":"HVS","name":"HSBC Hisse Senedi (TL) Fonu","qty":1282,"unit_price":1.534202,"market_value_try":1966.846964,"pct":0.00763571189081637,"platform":"Midas"},{"code":"MAC","name":"Marmara Capital Hisse Senedi (TL)","qty":12974,"unit_price":0.771119,"market_value_try":10004.497906,"pct":0.0388395564173094,"platform":"Midas"},{"code":"GO9","name":"One Portföy Birinci Hisse (TL)","qty":777,"unit_price":2.657074,"market_value_try":2064.546498,"pct":0.00801500194598867,"platform":"Midas"},{"code":"OPH","name":"Osmanlı Portföy Birinci Hisse","qty":221,"unit_price":25.091124,"market_value_try":5545.138404,"pct":0.0215273887712828,"platform":"Midas"},{"code":"KHA","name":"Pardus İkinci Hisse (TL)","qty":1279,"unit_price":3.989608,"market_value_try":5102.708632,"pct":0.0198097837248581,"platform":"Midas"},{"code":"TKM","name":"TEB Portföy Para Piyasası (TL)","qty":192975,"unit_price":0.211227,"market_value_try":44761.530325,"pct":0.173773636490073,"platform":"TEB"},{"code":"ZFB","name":"Ak Portföy Fintek ve Blokzinciri Değ.","qty":173,"unit_price":7.027924,"market_value_try":1215.830852,"pct":0.00472011003589083,"platform":"İş Bankası"},{"code":"MKG","name":"Aktif Portföy Altın Katılım Fonu","qty":1501,"unit_price":16.158208,"market_value_try":24253.470208,"pct":0.0941570514892313,"platform":"İş Bankası"},{"code":"GPT","name":"Aktif Portföy Robotik Tekn. Değ.","qty":439,"unit_price":2.694584,"market_value_try":1182.922376,"pct":0.004592352439036,"platform":"İş Bankası"},{"code":"CPU","name":"Aktif Portföy Teknoloji Katılım","qty":228,"unit_price":3.644179,"market_value_try":830.872812,"pct":0.00322562229114254,"platform":"İş Bankası"},{"code":"URA","name":"Ata Portföy Enerji Değ.","qty":526,"unit_price":1.722941,"market_value_try":906.266966,"pct":0.00351831818906083,"platform":"İş Bankası"},{"code":"JET","name":"Ata Portföy Havacılık & Savunma Değ.","qty":1183,"unit_price":2.24353,"market_value_try":2654.09599,"pct":0.01030375656121,"platform":"İş Bankası"},{"code":"RTG","name":"Ata Portföy Robotik Tekn. Değ.","qty":401,"unit_price":5.398944,"market_value_try":2164.976544,"pct":0.00840489242067912,"platform":"İş Bankası"},{"code":"DMG","name":"Deniz Portföy Gümüş Fon Sepeti","qty":6424,"unit_price":6.024603,"market_value_try":38702.049672,"pct":0.150249463373835,"platform":"İş Bankası"},{"code":"DVT","name":"Deniz Portföy Metaverse Değ.","qty":132,"unit_price":9.223734,"market_value_try":1217.532888,"pct":0.00472671769615198,"platform":"İş Bankası"},{"code":"DBH","name":"Deniz Portföy Eurobond (Döviz)","qty":37300,"unit_price":0.374986,"market_value_try":13986.9778,"pct":0.0543003775376825,"platform":"İş Bankası"},{"code":"DHM","name":"Deniz Portföy ESG Sürdürülebilirlik","qty":786,"unit_price":5.109696,"market_value_try":4016.221056,"pct":0.0155918113786947,"platform":"İş Bankası"},{"code":"GVI","name":"Garanti Portföy Üçüncü Fon Sepeti","qty":822,"unit_price":5.346108,"market_value_try":4394.500776,"pct":0.0170603724863593,"platform":"İş Bankası"},{"code":"GID","name":"Garanti Portföy İnşaat Sektörü Değ.","qty":927,"unit_price":1.60271,"market_value_try":1485.71217,"pct":0.00576784584181792,"platform":"İş Bankası"},{"code":"GBG","name":"Inveo G-20 Ülkeleri Yabancı Hisse","qty":1913,"unit_price":0.574714,"market_value_try":1099.427882,"pct":0.00426820932453719,"platform":"İş Bankası"},{"code":"GJB","name":"Inveo Gedik Portföy Birinci Fon Sepeti","qty":581,"unit_price":9.990847,"market_value_try":5804.682107,"pct":0.0225349917904589,"platform":"İş Bankası"},{"code":"OJT","name":"QNB Portföy Teknoloji Fon Sepeti","qty":2397,"unit_price":12.1509,"market_value_try":29125.7073,"pct":0.113072096421147,"platform":"İş Bankası"},{"code":"OLD","name":"QNB Portföy Temiz Enerji ve Su Fon Sep.","qty":292,"unit_price":3.101958,"market_value_try":905.771736,"pct":0.00351639560246976,"platform":"İş Bankası"},{"code":"CPT","name":"Rota Portföy Çip Tekn. Değ.","qty":719,"unit_price":3.660437,"market_value_try":2631.854203,"pct":0.0102174092853023,"platform":"İş Bankası"},{"code":"AN1","name":"Strateji Portföy Birinci Değ.","qty":15,"unit_price":108.322649,"market_value_try":1624.839735,"pct":0.0063079681908645,"platform":"İş Bankası"},{"code":"TCD","name":"Tacirler Portföy Değişken Fon","qty":36,"unit_price":45.862918,"market_value_try":1651.065048,"pct":0.00640978034909528,"platform":"İş Bankası"},{"code":"YZG","name":"Yapı Kredi Portföy Gümüş Fon Sep.","qty":3020,"unit_price":11.570181,"market_value_try":34941.94662,"pct":0.13565195573325,"platform":"İş Bankası"},{"code":"YJK","name":"Yapı Kredi Robotik & Yarı İletken Fon","qty":322,"unit_price":5.343233,"market_value_try":1720.521026,"pct":0.0066794230039688,"platform":"İş Bankası"},{"code":"YTD","name":"Yapı Kredi Yabancı Fon Sepeti","qty":1747,"unit_price":0.885601,"market_value_try":1547.144947,"pct":0.00600634074986648,"platform":"İş Bankası"},{"code":"ZDZ","name":"Ziraat Portföy Agresif Değ.","qty":25,"unit_price":12.2933,"market_value_try":307.3325,"pct":0.00119312913899097,"platform":"İş Bankası"},{"code":"IEV","name":"İş Portföy Taşımacılık Değ.","qty":538,"unit_price":5.120162,"market_value_try":2754.647156,"pct":0.0106941172491103,"platform":"İş Bankası"},{"code":"ITP","name":"İş Portföy Teknoloji Karma Fon","qty":97,"unit_price":12.322179,"market_value_try":1195.251363,"pct":0.00464021614900466,"platform":"İş Bankası"},{"code":"IJC","name":"İş Portföy Yarı İletken Tekn. Değ.","qty":151,"unit_price":14.881548,"market_value_try":2247.113748,"pct":0.00872376625109942,"platform":"İş Bankası"},{"code":"IPV","name":"İş Portföy Eurobond (Döviz)","qty":11,"unit_price":76.836903,"market_value_try":845.205933,"pct":0.00328126646908592,"platform":"İş Bankası"},{"code":"TGE","name":"İş Portföy Emtia Yabancı BYF Fon Sep.","qty":1744,"unit_price":0.28108,"market_value_try":490.20352,"pct":0.00190307274286951,"platform":"İş Bankası"},{"code":"TTA","name":"İş Portföy Altın Fonu","qty":3873,"unit_price":0.577295,"market_value_try":2235.863535,"pct":0.00868009056775921,"platform":"İş Bankası"}],"gold":[{"type":"Çeyrek Altın","qty":25,"total_gram":40.2,"cost_try":149824,"current_value_try":246475,"profit_try":96651,"profit_pct":0.645096913712089},{"type":"Bilezik","qty":2,"total_gram":18.32,"cost_try":109672,"current_value_try":111412,"profit_try":1740,"profit_pct":0.0158654898242031}],"gold_total":{"type":"TOPLAM ALTIN","qty":27,"total_gram":58.52,"cost_try":259496,"current_value_try":357887,"profit_try":98391,"profit_pct":0.379161913863798},"crypto_etf":[{"asset":"Bitcoin","type":"Kripto","qty":0.0205038,"avg_cost":"—","current_price":2974506.68,"currency":"TRY","total_value_try":60988.69,"profit_pct":null},{"asset":"VOO","type":"ETF (S&P 500)","qty":0.835828343,"avg_cost":"—","current_price":684.58,"currency":"USD","total_value_try":27189.9,"profit_pct":null}],"usd_try_rate":"47.52","display_name":"Temmuz"}};

const MONTH_ORDER = ['MART','NİSAN','MAYIS','HAZİRAN','TEMMUZ'];

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
                          <div style={{ width: Math.abs(flow.newMoney) / (Math.abs(flow.newMoney)+Math.abs(flow.marketMove) || 1) * 100 + '%', background: '#5b8fd9' }} />
                          <div style={{ width: Math.abs(flow.marketMove) / (Math.abs(flow.newMoney)+Math.abs(flow.marketMove) || 1) * 100 + '%', background: '#e8b84b' }} />
                        </div>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <span style={{ width: 8, height: 8, borderRadius: 999, background: '#5b8fd9' }} />
                            <span style={{ fontSize: 12, color: '#a9b4c0' }}>Yeni Para/Adet</span>
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
                        Adet/miktar artışı yeni yatırım, geri kalanı fiyat hareketinden sayılır. Yaklaşık bir ayrıştırmadır.
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
                columns={['KOD', 'ADI', 'ADET', 'FİYAT', 'DEĞER', 'PAY', 'SEKTÖR']}
                rows={[...month.stocks].sort((a,b)=>b.market_value_try-a.market_value_try).map(s => [
                  <span style={{ fontWeight: 600, color: '#5de0a8' }}>{s.code}</span>,
                  s.name,
                  fmtNum(s.qty),
                  fmtTRY(s.price, {decimals:2}),
                  fmtTRY(s.market_value_try),
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
                      <table style={styles.miniTable}>
                        <tbody>
                          <tr><td style={{...styles.td, color:'#8a94a0'}}>Ortalama Maliyet</td><td style={styles.td}>{typeof btc.avg_cost === 'string' ? btc.avg_cost : fmtNum(btc.avg_cost)}</td></tr>
                          <tr><td style={{...styles.td, color:'#8a94a0'}}>Güncel Fiyat</td><td style={styles.td}>{typeof btc.current_price === 'string' ? btc.current_price : fmtNum(btc.current_price)}</td></tr>
                          <tr><td style={{...styles.td, color:'#8a94a0'}}>Para Birimi</td><td style={styles.td}>{btc.currency}</td></tr>
                        </tbody>
                      </table>
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
        {points.map((p, i) => (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r={i === activeIdx ? 6 : 4} fill={i === activeIdx ? '#5de0a8' : '#1a1712'} stroke="#3ecf8e" strokeWidth="2" />
            <text x={p.x} y={h-10} textAnchor="middle" fontSize="12" fill={i === activeIdx ? '#d7dee5' : '#6d7885'} fontFamily="IBM Plex Mono, monospace">{p.name}</text>
            <text x={p.x} y={p.y - 14} textAnchor="middle" fontSize="11" fill="#a9b4c0" fontFamily="IBM Plex Mono, monospace">
              {(p.total/1000).toLocaleString('tr-TR', {maximumFractionDigits:0})}K
            </text>
          </g>
        ))}
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

  const pad = isNarrow ? 8 : 92; // room for outside labels + leader lines; tight on narrow screens since labels are hidden there
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

  const onlyLabelAbove = isNarrow ? 2 : 0.02; // on narrow screens, threshold >1 disables all leader-line labels (legend below covers it)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18 }}>
      <div style={{ width: '100%', maxWidth: vbSize, margin: '0 auto' }}>
        <svg viewBox={'0 0 ' + vbSize + ' ' + vbSize} style={{ width: '100%', height: 'auto', display: 'block', overflow: isNarrow ? 'hidden' : 'visible' }}>
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
    maxWidth: 1100, margin: '0 auto', display: 'flex', overflowX: 'auto',
  },
  monthBtn: {
    background: 'none', border: 'none', borderRight: '1px solid #232d38', cursor: 'pointer',
    padding: '14px 22px', color: '#6d7885', fontFamily: '"Fraunces", serif', textAlign: 'left', flexShrink: 0,
  },
  monthBtnActive: {
    color: '#eef2f5', background: 'rgba(62,207,142,0.08)', boxShadow: 'inset 0 -2px 0 #3ecf8e',
  },

  main: { position: 'relative', zIndex: 1, maxWidth: 1100, margin: '0 auto', padding: '28px 24px 60px' },

  tabs: { display: 'flex', gap: 24, marginBottom: 26, borderBottom: '1px solid #232d38' },
  tabBtn: {
    background: 'none', border: 'none', cursor: 'pointer', padding: '0 0 12px',
    fontFamily: 'IBM Plex Mono, monospace', fontSize: 12.5, letterSpacing: '0.04em',
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
