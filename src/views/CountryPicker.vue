<template>
  <div>
    <div class="selCountry" style="border: 1px solid #CCC;width: 450px;height:35px;">
      <div style="display: flex;padding-left:10px;" @click="dispList">
        <div style="margin-top:2px;font-size: 20px;">
          {{selectedCountry.e}}
        </div>
        <div ref="arrow" style="width: 10px; height: 35px;line-height: 35px;font-size:10px;
          opacity:0.6;transform: scaleY(.6);">{{arrowText}}</div>
        <div style="margin-left:10px;line-height:35px;height:35px;font-size:14px;">
          {{selectedCountry.n}}
          <template v-if="selectedCountry.l != ''">({{selectedCountry.l}})</template>
        </div>
      </div>
    </div>
    <div ref="countryList" style="display: none;">
      <ul class="country-list" style="font-size:14px;list-style: none;text-align: left;">
      <li class="oneCountry">
        <input style="width:240px;height:20px;" ref="searchKey" type="text" placeholder="搜索国家" @input="search" />
      </li>
      <template v-for="(item,index) in countryAll">
        <template v-if="item.t==0">
          <li class="divider"></li>
        </template>
        <template v-else>
          <li class="oneCountry" @click="selectCountry(item.c)"  >
          <div style="display: flex;">
            <div style="padding-left:5px;">{{item.n}}
              <template v-if="item.l != ''">({{item.l}})</template>
            </div>
          </div>
          </li>
        </template>
      </template>
      </ul>
    </div>
  </div>
</template>

<script>
import {onMounted, ref} from "vue"
  export default {
    name: "CountrySelect",
    props:['selected','top'],   //selected:默认选中的国家或地区, top:推荐的国家或地区:多个时用半角逗号隔开
    setup (props) {
//全部国家或地区的容器
    const countryAll = ref([]);
//初始化国家或地区
    let countrysOrigin = [
      {c:'ad',n:'Andorra',l:'安道尔',e:'🇦🇩',d:'+376',},
      {c:'ae',n:'United Arab Emirates ',l:'阿联酋',e:'🇦🇪',d:'+971'},
      {c:'af',n:'Afghanistan ',l:'阿富汗',e:'🇦🇫',d:'+93'},
      {c:'ag',n:'Antigua and Barbuda',l:'安提瓜和巴布达',e:'🇦🇬',d:'+1268'},
      {c:'ai',n:'Anguilla',l:'安圭拉',e:'🇦🇮',d:'+1 264'},
      {c:'al',n:'Albania ',l:'阿尔巴尼亚',e:'🇦🇱',d:'+355'},
      {c:'am',n:'Armenia ',l:'亚美尼亚',e:'🇦🇲',d:'+374'},
      {c:'ao',n:'Angola',l:'安哥拉',e:'🇦🇴',d:'+244'},
      {c:'ar',n:'Argentina',l:'阿根廷',e:'🇦🇷',d:'+54'},
      {c:'as',n:'American Samoa',l:'美属萨摩亚',e:'🇦🇸',d:'+1 684'},
      {c:'at',n:'Austria ',l:'奥地利',e:'🇦🇹',d:'+43'},
      {c:'au',n:'Australia',l:'澳大利亚',e:'🇦🇺',d:'+61'},
      {c:'aw',n:'Aruba',l:'阿鲁巴',e:'🇦🇼',d:'+297'},
      {c:'ax',n:'Åland Islands ',l:'奥兰群岛',e:'🇦🇽',d:''},
      {c:'az',n:'Azerbaijan ',l:'阿塞拜疆',e:'🇦🇿',d:'+994'},
      {c:'ba',n:'Bosnia and Herzegovina ',l:'波斯尼亚和黑塞哥维那',e:'🇧🇦',d:'+387'},
      {c:'bb',n:'Barbados',l:'巴巴多斯',e:'🇧🇧',d:'+1 246'},
      {c:'bd',n:'Bangladesh ',l:'孟加拉国',e:'🇧🇩',d:'+880'},
      {c:'be',n:'Belgium ',l:'比利时',e:'🇧🇪',d:'+32'},
      {c:'bf',n:'Burkina Faso',l:'布基纳法索',e:'🇧🇫',d:'+226'},
      {c:'bg',n:'Bulgaria ',l:'保加利亚',e:'🇧🇬',d:'+359'},
      {c:'bh',n:'Bahrain ',l:'巴林',e:'🇧🇭',d:'+973'},
      {c:'bi',n:'Burundi ',l:'布隆迪',e:'🇧🇮',d:'+257'},
      {c:'bj',n:'Benin ',l:'贝宁',e:'🇧🇯',d:'+229'},
      {c:'bl',n:'Saint Barthélemy ',l:'圣巴泰勒米',e:'🇧🇱',d:'+590'},
      {c:'bm',n:'Bermuda',l:'百慕大',e:'🇧🇲',d:'+1 441'},
      {c:'bn',n:'Brunei',l:'文莱达鲁萨兰国',e:'🇧🇳',d:'+673'},
      {c:'bo',n:'Bolivia',l:'玻利维亚, 多民族国',e:'🇧🇴',d:'+591'},
      {c:'bq',n:'Caribbean Netherlands',l:'博内尔岛, 圣尤斯特歇斯和萨巴',e:'🇧🇶',d:''},
      {c:'br',n:'Brazil ',l:'巴西',e:'🇧🇷',d:'+55'},
      {c:'bs',n:'Bahamas',l:'巴哈马',e:'🇧🇸',d:'+1 242'},
      {c:'bt',n:'Bhutan ',l:'不丹',e:'🇧🇹',d:'+975'},
      {c:'bw',n:'Botswana',l:'博茨瓦纳',e:'🇧🇼',d:'+267'},
      {c:'by',n:'Belarus ',l:'白俄罗斯',e:'🇧🇾',d:'+375'},
      {c:'bz',n:'Belize',l:'伯利兹',e:'🇧🇿',d:'+501'},
      {c:'ca',n:'Canada',l:'加拿大',e:'🇨🇦',d:'+1'},
      {c:'cc',n:'Cocos ',l:'科科斯群岛 ',e:'🇨🇨',d:'+61'},
      {c:'cd',n:'Congo ',l:'刚果民主共和国',e:'🇨🇩',d:'+243'},
      {c:'cf',n:'Central African Republic ',l:'中非共和国',e:'🇨🇫',d:'+236'},
      {c:'cg',n:'Congo ',l:'刚果',e:'🇨🇬',d:'+242'},
      {c:'ch',n:'Switzerland ',l:'瑞士',e:'🇨🇭',d:'+41'},
      {c:'ci',n:'Côte d’Ivoire',l:'科特迪瓦',e:'🇨🇮',d:'+225'},
      {c:'ck',n:'Cook Islands',l:'库克群岛',e:'🇨🇰',d:'+682'},
      {c:'cl',n:'Chile',l:'智利',e:'🇨🇱',d:'+56'},
      {c:'cm',n:'Cameroon ',l:'喀麦隆',e:'🇨🇲',d:'+237'},
      {c:'cn',n:'China ',l:'中国',e:'🇨🇳',d:'+86',r:'zh,zhongguo'},
      {c:'co',n:'Colombia',l:'哥伦比亚',e:'🇨🇴',d:'+57'},
      {c:'cr',n:'Costa Rica',l:'哥斯达黎加',e:'🇨🇷',d:'+506'},
      {c:'cu',n:'Cuba',l:'古巴',e:'🇨🇺',d:'+53'},
      {c:'cv',n:'Cape Verde ',l:'佛得角',e:'🇨🇻',d:'+238'},
      {c:'cw',n:'Curaçao',l:'库拉索',e:'🇨🇼',d:''},
      {c:'cx',n:'Christmas Island',l:'圣诞岛',e:'🇨🇽',d:'+61'},
      {c:'cy',n:'Cyprus ',l:'塞浦路斯',e:'🇨🇾',d:'+537'},
      {c:'cz',n:'Czech Republic ',l:'捷克',e:'🇨🇿',d:'+420'},
      {c:'de',n:'Germany ',l:'德国',e:'🇩🇪',d:'+49'},
      {c:'dj',n:'Djibouti',l:'吉布提',e:'🇩🇯',d:'+253'},
      {c:'dk',n:'Denmark ',l:'丹麦',e:'🇩🇰',d:'+45'},
      {c:'dm',n:'Dominica',l:'多米尼克',e:'🇩🇲',d:'+1 767'},
      {c:'do',n:'Dominican Republic ',l:'多明尼加共和国',e:'🇩🇴',d:'+1 849'},
      {c:'dz',n:'Algeria ',l:'阿尔及利亚',e:'🇩🇿',d:'+213'},
      {c:'ec',n:'Ecuador',l:'厄瓜多尔',e:'🇪🇨',d:'+593'},
      {c:'ee',n:'Estonia ',l:'爱沙尼亚',e:'🇪🇪',d:'+372'},
      {c:'eg',n:'Egypt ',l:'埃及',e:'🇪🇬',d:'+20'},
      {c:'eh',n:'Western Sahara ',l:'西撒哈拉',e:'🇪🇭',d:''},
      {c:'er',n:'Eritrea',l:'厄立特里亚',e:'🇪🇷',d:'+291'},
      {c:'es',n:'Spain ',l:'西班牙',e:'🇪🇸',d:'+34'},
      {c:'et',n:'Ethiopia',l:'埃塞俄比亚',e:'🇪🇹',d:'+251'},
      {c:'fi',n:'Finland ',l:'芬兰',e:'🇫🇮',d:'+358'},
      {c:'fj',n:'Fiji',l:'斐济',e:'🇫🇯',d:'+679'},
      {c:'fk',n:'Falkland Islands ',l:'马尔维纳斯群岛',e:'🇫🇰',d:'+500'},
      {c:'fm',n:'Micronesia',l:'密克罗尼西亚联邦',e:'🇫🇲',d:'+691'},
      {c:'fo',n:'Faroe Islands ',l:'法罗群岛',e:'🇫🇴',d:'+298'},
      {c:'fr',n:'France',l:'法国',e:'🇫🇷',d:'+33'},
      {c:'ga',n:'Gabon',l:'加蓬',e:'🇬🇦',d:'+241'},
      {c:'gb',n:'United Kingdom',l:'英国',e:'🇬🇧',d:'+44',r:'uk,Britain,england'},
      {c:'gd',n:'Grenada',l:'格林纳达',e:'🇬🇩',d:'+1 473'},
      {c:'ge',n:'Georgia ',l:'格鲁吉亚',e:'🇬🇪',d:'+995'},
      {c:'gf',n:'French Guiana ',l:'法属圭亚那',e:'🇬🇫',d:'+594'},
      {c:'gg',n:'Guernsey',l:'根西岛',e:'🇬🇬',d:'+44'},
      {c:'gh',n:'Ghana ',l:'加纳',e:'🇬🇭',d:'+233'},
      {c:'gi',n:'Gibraltar',l:'直布罗陀',e:'🇬🇮',d:'+350'},
      {c:'gl',n:'Greenland ',l:'格陵兰岛',e:'🇬🇱',d:'+299'},
      {c:'gm',n:'Gambia',l:'冈比亚',e:'🇬🇲',d:'+220'},
      {c:'gn',n:'Guinea ',l:'几内亚',e:'🇬🇳',d:'+224'},
      {c:'gp',n:'Guadeloupe',l:'瓜德罗普岛',e:'🇬🇵',d:'+590'},
      {c:'gq',n:'Equatorial Guinea ',l:'赤道几内亚',e:'🇬🇶',d:'+240'},
      {c:'gr',n:'Greece ',l:'希腊',e:'🇬🇷',d:'+30'},
      {c:'gs',n:'South Georgia &amp; South Sandwich Islands',l:'南乔治亚岛和南桑威奇群岛',e:'🇬🇸',d:'+500'},
      {c:'gt',n:'Guatemala',l:'危地马拉',e:'🇬🇹',d:'+502'},
      {c:'gu',n:'Guam',l:'关岛',e:'🇬🇺',d:'+1 671'},
      {c:'gw',n:'Guinea-Bissau ',l:'几内亚比绍',e:'🇬🇼',d:'+245'},
      {c:'gy',n:'Guyana',l:'圭亚那',e:'🇬🇾',d:'+595'},
      {c:'hk',n:'Hong Kong ',l:'中国香港',e:'🇭🇰',d:'+852'},
      {c:'hn',n:'Honduras',l:'洪都拉斯',e:'🇭🇳',d:'+504'},
      {c:'hr',n:'Croatia ',l:'克罗地亚',e:'🇭🇷',d:'+385'},
      {c:'ht',n:'Haiti',l:'海地',e:'🇭🇹',d:'+509'},
      {c:'hu',n:'Hungary ',l:'匈牙利',e:'🇭🇺',d:'+36'},
      {c:'id',n:'Indonesia',l:'印度尼西亚',e:'🇮🇩',d:'+62'},
      {c:'ie',n:'Ireland',l:'爱尔兰',e:'🇮🇪',d:'+353'},
      {c:'il',n:'Israel ',l:'以色列',e:'🇮🇱',d:'+972'},
      {c:'im',n:'Isle of Man',l:'马恩岛',e:'🇮🇲',d:'+44'},
      {c:'in',n:'India ',l:'印度',e:'🇮🇳',d:'+91'},
      {c:'io',n:'British Indian Ocean Territory',l:'英属印度洋领地',e:'🇮🇴',d:'+246'},
      {c:'iq',n:'Iraq ',l:'伊拉克',e:'🇮🇶',d:'+964'},
      {c:'ir',n:'Iran ',l:'伊朗伊斯兰共和国',e:'🇮🇷',d:'+98'},
      {c:'is',n:'Iceland ',l:'冰岛',e:'🇮🇸',d:'+354'},
      {c:'it',n:'Italy ',l:'意大利',e:'🇮🇹',d:'+39'},
      {c:'je',n:'Jersey',l:'泽西岛',e:'🇯🇪',d:'+44'},
      {c:'jm',n:'Jamaica',l:'牙买加',e:'🇯🇲',d:'+1 876'},
      {c:'jo',n:'Jordan ',l:'约旦',e:'🇯🇴',d:'+962'},
      {c:'jp',n:'Japan ',l:'日本',e:'🇯🇵',d:'+81'},
      {c:'ke',n:'Kenya',l:'肯尼亚',e:'🇰🇪',d:'+254'},
      {c:'kg',n:'Kyrgyzstan ',l:'吉尔吉斯斯坦',e:'🇰🇬',d:'+996'},
      {c:'kh',n:'Cambodia ',l:'柬埔寨',e:'🇰🇭',d:'+855'},
      {c:'ki',n:'Kiribati',l:'基里巴斯',e:'🇰🇮',d:'+686'},
      {c:'km',n:'Comoros ',l:'科摩罗',e:'🇰🇲',d:'+269'},
      {c:'kn',n:'Saint Kitts and Nevis',l:'圣基茨和尼维斯',e:'🇰🇳',d:'+1 869'},
      {c:'kp',n:'North Korea ',l:'朝鲜',e:'🇰🇵',d:'+850'},
      {c:'kr',n:'South Korea ',l:'韩国',e:'🇰🇷',d:'+82'},
      {c:'kw',n:'Kuwait ',l:'科威特',e:'🇰🇼',d:'+965'},
      {c:'ky',n:'Cayman Islands',l:'开曼群岛',e:'🇰🇾',d:'+ 345'},
      {c:'kz',n:'Kazakhstan ',l:'哈萨克斯坦',e:'🇰🇿',d:'+7 7'},
      {c:'la',n:'Laos ',l:'老挝',e:'🇱🇦',d:'+856'},
      {c:'lb',n:'Lebanon ',l:'黎巴嫩',e:'🇱🇧',d:'+961'},
      {c:'lc',n:'Saint Lucia',l:'圣卢西亚',e:'🇱🇨',d:'+1 758'},
      {c:'li',n:'Liechtenstein',l:'列支敦士登',e:'🇱🇮',d:'+423'},
      {c:'lk',n:'Sri Lanka ',l:'斯里兰卡',e:'🇱🇰',d:'+94'},
      {c:'lr',n:'Liberia',l:'利比里亚',e:'🇱🇷',d:'+231'},
      {c:'ls',n:'Lesotho',l:'莱索托',e:'🇱🇸',d:'+266'},
      {c:'lt',n:'Lithuania ',l:'立陶宛',e:'🇱🇹',d:'+370'},
      {c:'lu',n:'Luxembourg',l:'卢森堡',e:'🇱🇺',d:'+352'},
      {c:'lv',n:'Latvia ',l:'拉脱维亚',e:'🇱🇻',d:'+371'},
      {c:'ly',n:'Libya ',l:'利比亚',e:'🇱🇾',d:'+218'},
      {c:'ma',n:'Morocco ',l:'摩洛哥',e:'🇲🇦',d:'+212'},
      {c:'mc',n:'Monaco',l:'摩纳哥',e:'🇲🇨',d:'+377'},
      {c:'md',n:'Moldova ',l:'摩尔多瓦共和国',e:'🇲🇩',d:'+373'},
      {c:'me',n:'Montenegro ',l:'黑山',e:'🇲🇪',d:'+382'},
      {c:'mf',n:'Saint Martin ',l:'圣马丁',e:'🇲🇫',d:'+590'},
      {c:'mg',n:'Madagascar ',l:'马达加斯加',e:'🇲🇬',d:'+261'},
      {c:'mh',n:'Marshall Islands',l:'马绍尔群岛',e:'🇲🇭',d:'+692'},
      {c:'mk',n:'Macedonia ',l:'马其顿',e:'🇲🇰',d:'+389'},
      {c:'ml',n:'Mali',l:'马里',e:'🇲🇱',d:'+223'},
      {c:'mm',n:'Myanmar ',l:'缅甸',e:'🇲🇲',d:'+95'},
      {c:'mn',n:'Mongolia ',l:'蒙古',e:'🇲🇳',d:'+976'},
      {c:'mo',n:'Macau ',l:'中国澳门',e:'🇲🇴',d:'+853'},
      {c:'mp',n:'Northern Mariana Islands',l:'北马里亚纳群岛',e:'🇲🇵',d:'+1 670'},
      {c:'mq',n:'Martinique',l:'马提尼克岛',e:'🇲🇶',d:'+596'},
      {c:'mr',n:'Mauritania ',l:'毛里塔尼亚',e:'🇲🇷',d:'+222'},
      {c:'ms',n:'Montserrat',l:'蒙特塞拉特',e:'🇲🇸',d:'+1664'},
      {c:'mt',n:'Malta',l:'马耳他',e:'🇲🇹',d:'+356'},
      {c:'mu',n:'Mauritius ',l:'毛里求斯',e:'🇲🇺',d:'+230'},
      {c:'mv',n:'Maldives',l:'马尔代夫',e:'🇲🇻',d:'+960'},
      {c:'mw',n:'Malawi',l:'马拉维',e:'🇲🇼',d:'+265'},
      {c:'mx',n:'Mexico ',l:'墨西哥',e:'🇲🇽',d:'+52'},
      {c:'my',n:'Malaysia',l:'马来西亚',e:'🇲🇾',d:'+60'},
      {c:'mz',n:'Mozambique ',l:'莫桑比克',e:'🇲🇿',d:'+258'},
      {c:'na',n:'Namibia ',l:'纳米比亚',e:'🇳🇦',d:'+264'},
      {c:'nc',n:'New Caledonia ',l:'新喀里多尼亚',e:'🇳🇨',d:'+687'},
      {c:'ne',n:'Niger ',l:'尼日尔',e:'🇳🇪',d:'+227'},
      {c:'nf',n:'Norfolk Island',l:'诺福克岛',e:'🇳🇫',d:'+672'},
      {c:'ng',n:'Nigeria',l:'尼日利亚',e:'🇳🇬',d:'+234'},
      {c:'ni',n:'Nicaragua',l:'尼加拉瓜',e:'🇳🇮',d:'+505'},
      {c:'nl',n:'Netherlands ',l:'荷兰',e:'🇳🇱',d:'+31'},
      {c:'no',n:'Norway ',l:'挪威',e:'🇳🇴',d:'+47'},
      {c:'np',n:'Nepal ',l:'尼泊尔',e:'🇳🇵',d:'+977'},
      {c:'nr',n:'Nauru',l:'瑙鲁',e:'🇳🇷',d:'+674'},
      {c:'nu',n:'Niue',l:'纽埃',e:'🇳🇺',d:'+683'},
      {c:'nz',n:'New Zealand',l:'新西兰',e:'🇳🇿',d:'+64'},
      {c:'om',n:'Oman ',l:'阿曼',e:'🇴🇲',d:'+968'},
      {c:'pa',n:'Panama ',l:'巴拿马',e:'🇵🇦',d:'+507'},
      {c:'pe',n:'Peru ',l:'秘鲁',e:'🇵🇪',d:'+51'},
      {c:'pf',n:'French Polynesia ',l:'法属波利尼西亚',e:'🇵🇫',d:'+689'},
      {c:'pg',n:'Papua New Guinea',l:'巴布亚新几内亚',e:'🇵🇬',d:'+675'},
      {c:'ph',n:'Philippines',l:'菲律宾',e:'🇵🇭',d:'+63'},
      {c:'pk',n:'Pakistan ',l:'巴基斯坦',e:'🇵🇰',d:'+92'},
      {c:'pl',n:'Poland ',l:'波兰',e:'🇵🇱',d:'+48'},
      {c:'pm',n:'Saint Pierre and Miquelon ',l:'圣皮埃尔和密克隆岛',e:'🇵🇲',d:'+508'},
      {c:'pn',n:'Pitcairn Islands',l:'皮特凯恩',e:'🇵🇳',d:'+872'},
      {c:'pr',n:'Puerto Rico',l:'波多黎各',e:'🇵🇷',d:'+1 939'},
      {c:'ps',n:'Palestine ',l:'巴勒斯坦',e:'🇵🇸',d:'+970'},
      {c:'pt',n:'Portugal',l:'葡萄牙',e:'🇵🇹',d:'+351'},
      {c:'pw',n:'Palau',l:'帕劳',e:'🇵🇼',d:'+680'},
      {c:'py',n:'Paraguay',l:'巴拉圭',e:'🇵🇾',d:'+595'},
      {c:'qa',n:'Qatar ',l:'卡塔尔',e:'🇶🇦',d:'+974'},
      {c:'re',n:'Réunion ',l:'留尼旺岛',e:'🇷🇪',d:'+262'},
      {c:'ro',n:'Romania ',l:'罗马尼亚',e:'🇷🇴',d:'+40'},
      {c:'rs',n:'Serbia ',l:'塞尔维亚',e:'🇷🇸',d:'+381'},
      {c:'ru',n:'Russia ',l:'俄罗斯联邦',e:'🇷🇺',d:'+7'},
      {c:'rw',n:'Rwanda',l:'卢旺达',e:'🇷🇼',d:'+250'},
      {c:'sa',n:'Saudi Arabia ',l:'沙特阿拉伯',e:'🇸🇦',d:'+966'},
      {c:'sb',n:'Solomon Islands',l:'所罗门群岛',e:'🇸🇧',d:'+677'},
      {c:'sc',n:'Seychelles',l:'塞舌耳',e:'🇸🇨',d:'+248'},
      {c:'sd',n:'Sudan ',l:'苏丹红',e:'🇸🇩',d:'+249'},
      {c:'se',n:'Sweden ',l:'瑞典',e:'🇸🇪',d:'+46'},
      {c:'sg',n:'Singapore',l:'新加坡',e:'🇸🇬',d:'+65'},
      {c:'sh',n:'Saint Helena',l:'圣赫勒拿',e:'🇸🇭',d:'+290'},
      {c:'si',n:'Slovenia ',l:'斯洛文尼亚',e:'🇸🇮',d:'+386'},
      {c:'sj',n:'Svalbard and Jan Mayen ',l:'斯瓦尔巴和扬马延岛',e:'🇸🇯',d:'+47'},
      {c:'sk',n:'Slovakia ',l:'斯洛伐克',e:'🇸🇰',d:'+421'},
      {c:'sl',n:'Sierra Leone',l:'塞拉利昂',e:'🇸🇱',d:'+232'},
      {c:'sm',n:'San Marino',l:'圣马力诺',e:'🇸🇲',d:'+378'},
      {c:'sn',n:'Senegal ',l:'塞内加尔',e:'🇸🇳',d:'+221'},
      {c:'so',n:'Somalia ',l:'索马里',e:'🇸🇴',d:'+252'},
      {c:'sr',n:'Suriname',l:'苏里南',e:'🇸🇷',d:'+597'},
      {c:'ss',n:'South Sudan ',l:'南苏丹',e:'🇸🇸',d:''},
      {c:'st',n:'São Tomé and Príncipe ',l:'圣多美和普林西比',e:'🇸🇹',d:'+239'},
      {c:'sv',n:'El Salvador',l:'萨尔瓦多',e:'🇸🇻',d:'+503'},
      {c:'sx',n:'Sint Maarten',l:'圣马丁岛',e:'🇸🇽',d:''},
      {c:'sy',n:'Syria ',l:'阿拉伯叙利亚共和国',e:'🇸🇾',d:'+963'},
      {c:'sz',n:'Swaziland',l:'斯威士兰',e:'🇸🇿',d:'+268'},
      {c:'tc',n:'Turks and Caicos Islands',l:'特克斯和凯科斯群岛',e:'🇹🇨',d:'+1 649'},
      {c:'td',n:'Chad ',l:'乍得',e:'🇹🇩',d:'+235'},
      {c:'tg',n:'Togo',l:'多哥',e:'🇹🇬',d:'+228'},
      {c:'th',n:'Thailand ',l:'泰国',e:'🇹🇭',d:'+66'},
      {c:'tj',n:'Tajikistan',l:'塔吉克斯坦',e:'🇹🇯',d:'+992'},
      {c:'tk',n:'Tokelau',l:'托克劳群岛',e:'🇹🇰',d:'+690'},
      {c:'tl',n:'Timor-Leste',l:'东帝汶',e:'🇹🇱',d:'+670'},
      {c:'tm',n:'Turkmenistan',l:'土库曼斯坦',e:'🇹🇲',d:'+993'},
      {c:'tn',n:'Tunisia ',l:'突尼斯',e:'🇹🇳',d:'+216'},
      {c:'to',n:'Tonga',l:'汤加',e:'🇹🇴',d:'+676'},
      {c:'tr',n:'Turkey ',l:'土耳其',e:'🇹🇷',d:'+90'},
      {c:'tt',n:'Trinidad and Tobago',l:'特立尼达和多巴哥',e:'🇹🇹',d:'+1 868'},
      {c:'tv',n:'Tuvalu',l:'图瓦卢',e:'🇹🇻',d:'+688'},
      {c:'tw',n:'Taiwan ',l:'中国台湾',e:'🇹🇼',d:'+886'},
      {c:'tz',n:'Tanzania',l:'坦桑尼亚联合共和国',e:'🇹🇿',d:'+255'},
      {c:'ua',n:'Ukraine ',l:'乌克兰',e:'🇺🇦',d:'+380'},
      {c:'ug',n:'Uganda',l:'乌干达',e:'🇺🇬',d:'+256'},
      {c:'um',n:'U.S. Minor Outlying Islands',l:'美国本土外小岛屿',e:'🇺🇲',d:''},
      {c:'us',n:'United States',l:'美国',e:'🇺🇸',d:'+1',r:'usa,america'},
      {c:'uy',n:'Uruguay',l:'乌拉圭',e:'🇺🇾',d:'+598'},
      {c:'uz',n:'Uzbekistan ',l:'乌兹别克斯坦',e:'🇺🇿',d:'+998'},
      {c:'va',n:'Vatican City ',l:'梵蒂冈城国',e:'🇻🇦',d:'+379'},
      {c:'vc',n:'Saint Vincent and the Grenadines',l:'圣文森特和格林纳丁斯',e:'🇻🇨',d:'+1 784'},
      {c:'ve',n:'Venezuela',l:'委内瑞拉玻利瓦尔共和国',e:'🇻🇪',d:'+58'},
      {c:'vg',n:'British Virgin Islands',l:'英属维尔京群岛',e:'🇻🇬',d:'+1 284'},
      {c:'vi',n:'U.S. Virgin Islands',l:'美属维京群岛',e:'🇻🇮',d:'+1 340'},
      {c:'vn',n:'Vietnam ',l:'越南',e:'🇻🇳',d:'+84'},
      {c:'vu',n:'Vanuatu',l:'瓦努阿图',e:'🇻🇺',d:'+678'},
      {c:'wf',n:'Wallis and Futuna',l:'瓦利斯和富图纳群岛',e:'🇼🇫',d:'+681'},
      {c:'ws',n:'Samoa',l:'萨摩亚',e:'🇼🇸',d:'+685'},
      {c:'xk',n:'Kosovo ',l:'科索沃',e:'🇽🇰',d:'+383'},
      {c:'ye',n:'Yemen ',l:'也门',e:'🇾🇪',d:'+967'},
      {c:'yt',n:'Mayotte',l:'马约特',e:'🇾🇹',d:'+262'},
      {c:'za',n:'South Africa',l:'南非',e:'🇿🇦',d:'+27'},
      {c:'zm',n:'Zambia',l:'赞比亚',e:'🇿🇲',d:'+260'},
      {c:'zw',n:'Zimbabwe',l:'津巴布韦',e:'🇿🇼',d:'+263'},
      ];
    countryAll.value = countrysOrigin;
//默认选中的国家或地区
    const selectedCountry = ref([]);
//根据code得到country对象
    const selectCountry = (code) => {
      selectedCountry.value = getSelectedCountry(code);
      console.log(selectedCountry.value.l)
      //this.$store.commit('change_country',selectedCountry.value.l)
      countryList.value.style.display = 'none'
      arrowText.value = "▼"
    }
//根据code得到国家或地区信息
    const getSelectedCountry = (code) => {
      let len = countrysOrigin.length;
      console.log("当前length:"+len);
      for (let i = 0; i < len; i++) {
        let one = countrysOrigin[i];
        if (one.t != undefined && (one.t == '0' || one.t == '1')) {
          console.log(one);
          continue;
        }else {
          if (one.c == code) {
            return one;
          }
        }
      }
      return null;
    }
//页面上的国家或地区列表div
    const countryList = ref(null);
//显示或隐藏国家或地区列表div
    const dispList = () => {
      if (countryList.value.style.display == 'none') {
        countryList.value.style.display = ''
        arrowText.value = "▲"
      }else {
        countryList.value.style.display = 'none'
        arrowText.value = "▼"
      }
    }
//输入框
    const searchKey = ref(null);
//搜索
    const search  = () => {
      let key = searchKey.value.value;
      let countryRes = [];
      if (key == '') {
        countryAll.value = countrysOrigin;
      } else {
        let len = countrysOrigin.length;
        for (let i = 0; i < len; i++) {
          let one = countrysOrigin[i];
          if (one.t != undefined && (one.t == '0' || one.t == '1')) {
            console.log(one);
            continue;
          } else {
            let str = one.c+"_"+one.n+"_"+one.e+"_"+one.l;
            if (one.r != undefined) {
              str+="_"+one.r;
            }
            if (str.toLowerCase().indexOf(key) != -1) {
              countryRes.push(one);
            }
          }
        }
        countryAll.value = countryRes;
      }
      console.log(countryAll.value);
    }
//默认的箭头
    const arrowText = ref("▼");
//页面加载后执行，根据组件的参数得到默认选中的国家或地区和推荐的国家或地区
    onMounted(() => {
//接收到父组件调用时的参数
      selectCountry(props.selected);
      let arr = props.top.split(',');
      let arrLen = arr.length;
      if (arrLen > 0) {
        let divider = {t:'0'};
        countrysOrigin.unshift(divider);
        for (let i=arrLen-1;i>=0;i--) {
          let code = arr[i];
          let countryOne = getSelectedCountry(code);
          let { ...countryCopy } = countryOne
          countryCopy.t = '1';
          if (countryOne != null) {
            countrysOrigin.unshift(countryCopy);
          }
        }
      }
      countryAll.value = countrysOrigin;
    })
    return {
      countryAll,
      selectCountry,
      dispList,
      countryList,
      searchKey,
      search,
      arrowText,
      //选中的国家
      selectedCountry,
    }
  }
}
</script>
<style scoped>
.divider {
    padding-bottom: 5px;
    margin-bottom: 5px;
    border-bottom: 1px solid #ccc;
}
.country-list {
    position: absolute;
    z-index: 2;
    list-style: none;
    text-align: left;
    padding: 0;
    margin: 0 0 0 -1px;
    -webkit-box-shadow: 1px 1px 4px rgb(0 0 0 / 20%);
    box-shadow: 1px 1px 4px rgb(0 0 0 / 20%);
    background-color: white;
    border: 1px solid #ccc;
    white-space: nowrap;
    max-height: 200px;
    overflow-y: scroll;
    width:390px;
}
.oneCountry {
    padding: 1px 10px;
    height:35px;
    line-height: 35px;
}
.oneCountry:hover {
    background-color: rgba(0, 0, 0, 0.05);
}
.selCountry:hover {
    background-color: rgba(0, 0, 0, 0.05);
}
.arrow {
    position: absolute;
    top: 50%;
    margin-top: -2px;
    right: 6px;
    width: 0;
    height: 0;
    border-left: 3px solid transparent;
    border-right: 3px solid transparent;
    border-top: 4px solid #555;
}
</style>