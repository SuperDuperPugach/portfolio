$(document).ready(function() {

	/*//Аякс отправка форм      !(хз, может нужно ------------БЭКЭНДЕРУ-----------)
	//Документация: http://api.jquery.com/jquery.ajax/
	$("form").submit(function() {
		$.ajax({
			type: "GET",
			url: "mail.php",
			data: $("form").serialize()
		}).done(function() {
			alert("Спасибо за заявку!");
			setTimeout(function() {
				$.fancybox.close();
			}, 1000);
		});
		return false;
	});*/
	
	
	
});

// GOOGLE MAP //
      google.charts.load('current', {'packages':['geochart']});
      google.charts.setOnLoadCallback(drawRegionsMap);

      function drawRegionsMap() {

        var data = google.visualization.arrayToDataTable([
          ['Country', 'Popularity'],
['AD', 10],     // Andorra //
['AE', 20],     // United Arab Emirates //
['AF', 30],     // Afghanistan //
['AG', 40],     // Antigua and Barbuda //
['AI', 50],     // Anguilla //
['AL', 60],     // Albania //
['AM', 70],     // Armenia //
['AO', 80],     // Angola //
['AQ', 90],     // Antarctica //
['AR', 100],     // Argentina //
['AS', 110],     // American Samoa //
['AT', 120],     // Austria //
['AU', 130],     // Australia //
['AW', 140],     // Aruba //
['AX', 150],     // Åland Islands //
['AZ', 160],     // Azerbaijan //
['BA', 170],     // Bosnia and Herzegovina //
['BB', 180],     // Barbados //
['BD', 190],     // Bangladesh //
['BE', 200],     // Belgium //
['BF', 210],     // Burkina Faso //
['BG', 220],     // Bulgaria //
['BH', 230],     // Bahrain //
['BI', 240],     // Burundi //
['BJ', 250],     // Benin //
['BL', 260],     // Saint Barthélemy //
['BM', 270],     // Bermuda //
['BN', 280],     // Brunei Darussalam //
['BO', 290],     // Bolivia', Plurinational State of //
['BQ', 300],     // Bonaire', Sint Eustatius and Saba //
['BR', 310],     // Brazil //
['BS', 320],     // Bahamas //
['BT', 330],     // Bhutan //
['BV', 340],     // Bouvet Island //
['BW', 350],     // Botswana //
['BY', 360],     // Belarus //
['BZ', 370],     // Belize //
['CA', 380],     // Canada //
['CC', 390],     // Cocos (Keeling) Islands //
['CD', 400],     // Congo', the Democratic Republic of the //
['CF', 410],     // Central African Republic //
['CG', 420],     // Congo //
['CH', 430],     // Switzerland //
['CI', 440],     // Côte d'Ivoire //
['CK', 450],     // Cook Islands //
['CL', 460],     // Chile //
['CM', 470],     // Cameroon //
['CN', 480],     // China //
['CO', 490],     // Colombia //
['CR', 500],     // Costa Rica //
['CU', 510],     // Cuba //
['CV', 520],     // Cabo Verde //
['CW', 530],     // Curaçao //
['CX', 540],     // Christmas Island //
['CY', 550],     // Cyprus //
['CZ', 560],     // Czech Republic //
['DE', 570],     // Germany //
['DJ', 580],     // Djibouti //
['DK', 590],     // Denmark //
['DM', 600],     // Dominica //
['DO', 610],     // Dominican Republic //
['DZ', 620],     // Algeria //
['EC', 630],     // Ecuador //
['EE', 640],     // Estonia //
['EG', 650],     // Egypt //
['EH', 660],     // Western Sahara //
['ER', 670],     // Eritrea //
['ES', 680],     // Spain //
['ET', 690],     // Ethiopia //
['FI', 700],     // Finland //
['FJ', 710],     // Fiji //
['FK', 720],     // Falkland Islands (Malvinas) //
['FM', 730],     // Micronesia', Federated States of //
['FO', 740],     // Faroe Islands //
['FR', 750],     // France //
['GA', 760],     // Gabon //
['GB', 770],     // United Kingdom of Great Britain and Northern Ireland //
['GD', 780],     // Grenada //
['GE', 790],     // Georgia //
['GF', 800],     // French Guiana //
['GG', 810],     // Guernsey //
['GH', 820],     // Ghana //
['GI', 830],     // Gibraltar //
['GL', 840],     // Greenland //
['GM', 850],     // Gambia //
['GN', 860],     // Guinea //
['GP', 870],     // Guadeloupe //
['GQ', 880],     // Equatorial Guinea //
['GR', 890],     // Greece //
['GS', 900],     // South Georgia and the South Sandwich Islands //
['GT', 910],     // Guatemala //
['GU', 920],     // Guam //
['GW', 930],     // Guinea-Bissau //
['GY', 940],     // Guyana //
['HK', 950],     // Hong Kong //
['HM', 960],     // Heard Island and McDonald Islands //
['HN', 970],     // Honduras //
['HR', 980],     // Croatia //
['HT', 990],     // Haiti //
['HU', 1000],     // Hungary //
['ID', 1010],     // Indonesia //
['IE', 1020],     // Ireland //
['IL', 1030],     // Israel //
['IM', 1040],     // Isle of Man //
['IN', 1050],     // India //
['IO', 1060],     // British Indian Ocean Territory //
['IQ', 1070],     // Iraq //
['IR', 1080],     // Iran', Islamic Republic of //
['IS', 1090],     // Iceland //
['IT', 1100],     // Italy //
['JE', 1110],     // Jersey //
['JM', 1120],     // Jamaica //
['JO', 1130],     // Jordan //
['JP', 1140],     // Japan //
['KE', 1150],     // Kenya //
['KG', 1160],     // Kyrgyzstan //
['KH', 1170],     // Cambodia //
['KI', 1180],     // Kiribati //
['KM', 1190],     // Comoros //
['KN', 1200],     // Saint Kitts and Nevis //
['KP', 1210],     // Korea', Democratic People's Republic of //
['KR', 1220],     // Korea', Republic of //
['KW', 1230],     // Kuwait //
['KY', 1240],     // Cayman Islands //
['KZ', 1250],     // Kazakhstan //
['LA', 1260],     // Lao People's Democratic Republic //
['LB', 1270],     // Lebanon //
['LC', 1280],     // Saint Lucia //
['LI', 1290],     // Liechtenstein //
['LK', 1300],     // Sri Lanka //
['LR', 1310],     // Liberia //
['LS', 1320],     // Lesotho //
['LT', 1330],     // Lithuania //
['LU', 1340],     // Luxembourg //
['LV', 1350],     // Latvia //
['LY', 1360],     // Libya //
['MA', 1370],     // Morocco //
['MC', 1380],     // Monaco //
['MD', 1390],     // Moldova', Republic of //
['ME', 1400],     // Montenegro //
['MF', 1410],     // Saint Martin (French part) //
['MG', 1420],     // Madagascar //
['MH', 1430],     // Marshall Islands //
['MK', 1440],     // Macedonia', the former Yugoslav Republic of //
['ML', 1450],     // Mali //
['MM', 1460],     // Myanmar //
['MN', 1470],     // Mongolia //
['MO', 1480],     // Macao //
['MP', 1490],     // Northern Mariana Islands //
['MQ', 1500],     // Martinique //
['MR', 1510],     // Mauritania //
['MS', 1520],     // Montserrat //
['MT', 1530],     // Malta //
['MU', 1540],     // Mauritius //
['MV', 1550],     // Maldives //
['MW', 1560],     // Malawi //
['MX', 1570],     // Mexico //
['MY', 1580],     // Malaysia //
['MZ', 1590],     // Mozambique //
['NA', 1600],     // Namibia //
['NC', 1610],     // New Caledonia //
['NE', 1620],     // Niger //
['NF', 1630],     // Norfolk Island //
['NG', 1640],     // Nigeria //
['NI', 1650],     // Nicaragua //
['NL', 1660],     // Netherlands //
['NO', 1670],     // Norway //
['NP', 1680],     // Nepal //
['NR', 1690],     // Nauru //
['NU', 1700],     // Niue //
['NZ', 1710],     // New Zealand //
['OM', 1720],     // Oman //
['PA', 1730],     // Panama //
['PE', 1740],     // Peru //
['PF', 1750],     // French Polynesia //
['PG', 1760],     // Papua New Guinea //
['PH', 1770],     // Philippines //
['PK', 1780],     // Pakistan //
['PL', 1790],     // Poland //
['PM', 1800],     // Saint Pierre and Miquelon //
['PN', 1810],     // Pitcairn //
['PR', 1820],     // Puerto Rico //
['PS', 1830],     // Palestine', State of //
['PT', 1840],     // Portugal //
['PW', 1850],     // Palau //
['PY', 1860],     // Paraguay //
['QA', 1870],     // Qatar //
['RE', 1880],     // Réunion //
['RO', 1890],     // Romania //
['RS', 1900],     // Serbia //
['RU', 1910],     // Russian Federation //
['RW', 1920],     // Rwanda //
['SA', 1930],     // Saudi Arabia //
['SB', 1940],     // Solomon Islands //
['SC', 1950],     // Seychelles //
['SD', 1960],     // Sudan //
['SE', 1970],     // Sweden //
['SG', 1980],     // Singapore //
['SH', 1990],     // Saint Helena', Ascension and Tristan da Cunha //
['SI', 2000],     // Slovenia //
['SJ', 2010],     // Svalbard and Jan Mayen //
['SK', 2020],     // Slovakia //
['SL', 2030],     // Sierra Leone //
['SM', 2040],     // San Marino //
['SN', 2050],     // Senegal //
['SO', 2060],     // Somalia //
['SR', 2070],     // Suriname //
['SS', 2080],     // South Sudan //
['ST', 2090],     // Sao Tome and Principe //
['SV', 2100],     // El Salvador //
['SX', 2110],     // Sint Maarten (Dutch part) //
['SY', 2120],     // Syrian Arab Republic //
['SZ', 2130],     // Swaziland //
['TC', 2140],     // Turks and Caicos Islands //
['TD', 2150],     // Chad //
['TF', 2160],     // French Southern Territories //
['TG', 2170],     // Togo //
['TH', 2180],     // Thailand //
['TJ', 2190],     // Tajikistan //
['TK', 2200],     // Tokelau //
['TL', 2210],     // Timor-Leste //
['TM', 2220],     // Turkmenistan //
['TN', 2230],     // Tunisia //
['TO', 2240],     // Tonga //
['TR', 2250],     // Turkey //
['TT', 2260],     // Trinidad and Tobago //
['TV', 2270],     // Tuvalu //
['TW', 2280],     // Taiwan', Province of China //
['TZ', 2290],     // Tanzania', United Republic of //
['UA', 2300],     // Ukraine //
['UG', 2310],     // Uganda //
['UM', 2320],     // United States Minor Outlying Islands //
['US', 2330],     // United States of America //
['UY', 2340],     // Uruguay //
['UZ', 2350],     // Uzbekistan //
['VA', 2360],     // Holy See //
['VC', 2370],     // Saint Vincent and the Grenadines //
['VE', 2380],     // Venezuela', Bolivarian Republic of //
['VG', 2390],     // Virgin Islands', British //
['VI', 2400],     // Virgin Islands', U.S. //
['VN', 2410],     // Viet Nam //
['VU', 2420],     // Vanuatu //
['WF', 2430],     // Wallis and Futuna //
['WS', 2440],     // Samoa //
['YE', 2450],     // Yemen //
['YT', 2460],     // Mayotte //
['ZA', 2470],     // South Africa //
['ZM', 2480],     // Zambia //
['ZW', 2490]     // Zimbabwe //



        ]);

        var options = {
        	legend: 'none',
        	colors: ['gray', '#16a085']
        };

        var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

        chart.draw(data, options);
      };