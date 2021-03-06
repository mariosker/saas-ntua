const getRandom = require('./picker')
const hashtags = [
  'esql',
  'pugs',
  'bduf',
  'crowd',
  'curl-language',
  'design-debt',
  'jscc',
  'firefox11',
  'bpgsql',
  'kmem',
  'korundum',
  'startup.cmd',
  'llvm-3.1',
  'slimpicker',
  'tracekit',
  'cg-toolkit',
  'mapi-audiocopy',
  'mapi-audiopaste',
  'ryz',
  'framejs',
  'topcased',
  'tridion-events',
  'glomosim',
  'glue-framework',
  'modula-3',
  'better-assert',
  'thinlet',
  'joone',
  'gwt-preprocessor',
  'quick-junit',
  'clif',
  'metrofax',
  'ultimategrid',
  'ice-validation',
  'bootstrap-protocol',
  'fitlibraryweb',
  'pushmobi',
  'eval-paste',
  'crossroads-io',
  'nucleon',
  'powertab',
  'walltime-js',
  'feedtools',
  'gaap',
  'ccspeed',
  'cortado',
  'sjxp',
  'munq',
  'pyxmpp2',
  'vimrunner',
  'rodf',
  'cromagversion',
  'emacs-dirtree',
  'toe.js',
  'helix-dna-server',
  'cfnumberref',
  'moq-rt',
  'beanstalk-maven-plugin',
  'portaljs',
  'hake',
  'portal-java',
  'google-webdriver',
  'caldecott',
  'mysql-error-1253',
  'xinha',
  'xoml',
  'smallsql',
  'adipoli',
  'html2latex',
  'studioshell',
  'sprinkle',
  'parse-ez',
  'nstore',
  'onami',
  'jquery-socialist',
  'pharlap',
  'chud',
  'drupal-spam',
  'odata-php-sdk',
  'fotoware',
  'oggenc',
  'ineqdeco',
  'gimli',
  'xflr5',
  'fakeo',
  'jminix',
  'compiler-architecture',
  'firm-real-time',
  'b2evolution',
  'mozapps',
  'venkman',
  'polyphonic-c#',
  'prequel',
  'openrpt',
  'geo-schema',
  'pebl',
  'jonix',
  'camelot-php-tools',
  'perl-express',
  'wddatepicker',
  'jnario',
  'nsrails',
  'uberspacify',
  'shader-model',
  'shrinkr',
  'rdlx',
  'ontopia',
  'tolog',
  'bytechannel',
  'ez-letter',
  'aol-desktop',
  'keymasterjs',
  'opdispatch',
  'sparks-language',
  'taskjs',
  'copy.com',
  'porta-one',
  'kix',
  'flingo',
  'mongomatic',
  'telerik-radformdecorator',
  'grunt-smoosher',
  'timing-framework',
  'tinymvc',
  'taip',
  'tayra',
  'phamlp',
  'flash-block',
  'lisp-unit',
  'packageinspectionfailed',
  'clewn',
  'escape-server',
  'dtsignalflag',
  'perl5.6',
  'synctool',
  'php-analog-package',
  'sim.js',
  'routemagic',
  'tz4net',
  'handjs',
  'chui.js',
  'cool-kitten',
  'application-level-proxy',
  'appverse',
  'watir-jquery',
  'tmapiclient',
  'perfect-developer',
  'underscore.php',
  'scala-xray',
  'couchdb-lite',
  'keyhelp',
  'keyboard-grab',
  'havebox',
  'bck2brwsr',
  'mobilejoomla',
  'codeviz',
  'chameleonpi',
  'dbi-profile',
  'sqlfairy',
  'groundy',
  'envision.js',
  'nsmenuitemcell',
  'jxtree',
  'aspmaker',
  'ogd-wien',
  'grmm',
  'topoedit',
  'twido-suite',
  'agen-framework',
  'dapper-lite',
  'flacbox',
  'xptable',
  'mergmicrophone',
  'transparency.js',
  'zlib-conduit',
  'bzlib-conduit',
  'freecap',
  'iwrap',
  'xmlstreamer',
  'firefox-aurora',
  'dart-spark',
  'amarino',
  'protouser',
  'c10n',
  'umbraco-webforms',
  'shark-compiler',
  'biohaskell',
  'messageenumerator',
  'pagelines-framework',
  'csvtools',
  'small-bet',
  'zipunit',
  'clustalx',
  'cobub-razor',
  'playnomics',
  'real-time-text',
  'meny-js',
  'brubeck',
  'pid-algorithm',
  'kamianri'
]

class Hashtags {
  pickRandom (n = 1) {
    const item = getRandom(hashtags, n)
    return item
  }
}

module.exports = Hashtags
