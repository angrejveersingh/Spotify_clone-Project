import { Dimensions, Platform } from 'react-native';
import SpotifyWebApi from 'spotify-web-api-node';
export const spotifyApi = new SpotifyWebApi();

export const TOKEN = "BQDM5JKVec6iqh7Yhw8o5yllVIZdgqXizPLVUm1kJui_-6Uu4VszMjF2Y6-SuxysKsrF4MS9vYZfoRpXBp0DAHCADUXNfJnOUc-27d9V04CkSNv_Q_xBoQUxIpyuanQZIk-Y-x4relMqyuCT0sXCciXFZDOsXPlrlQL7bK1Ee1lOFuDVuYeEdC3baSV5DFYmh_4"

export const formatTime = (sec) => {
    const padTime = (num, size) => `000${num}`.slice(size * -1);
    const time = parseFloat(sec).toFixed(3);
    const minutes = Math.floor(time / 60) % 60;
    const seconds = Math.floor(time - minutes * 60);

    return `${padTime(minutes, 1)}:${padTime(seconds, 2)}`;
};

const android = Platform.OS === 'android';

const iOS = Platform.OS === 'ios';
const web = Platform.OS === 'web';
const windowInfo = Dimensions.get('window');
const { height, width } = windowInfo;
const aspectRatio = height / width;

const { isPad } = Platform;

let iPhoneNotch = false;
if (iOS) {
    if (height === 812 || height === 844 || height === 896 || height === 926) {
        iPhoneNotch = true;
    }
}

export const device = {
    android,
    aspectRatio,
    height,
    iOS,
    iPhoneNotch,
    isPad,
    web,
    width
};


export const colors = {
    black: '#000000',
    black20: 'rgba(0, 0, 0, 0.2)',
    black40: 'rgba(0, 0, 0, 0.4)',
    black50: 'rgba(0, 0, 0, 0.5)',
    black70: 'rgba(0, 0, 0, 0.7)',
    white: '#ffffff',
    blackBlur: '#161616',
    red: "#FF0000",
    // spotify colors
    blackBg: '#121212',
    transparent: 'transparent',
    brandPrimary: '#57b660',
    grey: '#282828',
    greyInactive: '#b3b3b3',
    greyLight: '#bebebe',
    greySwitchBorder: '#404040',
    greyOff: '#3e3e3e',
    grey3: '#333'
};

const fonts = {
    spotifyLight: 'spotifyLight',
    spotifyRegular: 'spotifyRegular',
    spotifyBold: 'spotifyBold',
    bold: device.iOS ? 'HelveticaNeue-Bold' : 'sans-serif-condensed',
    light: device.iOS ? 'HelveticaNeue-Light' : 'sans-serif-light',
    medium: device.iOS ? 'HelveticaNeue-Medium' : 'sans-serif-medium',
    regular: device.iOS ? 'HelveticaNeue' : 'sans-serif'
};

const spaceGrid = 8;

const spaceHalf = Math.ceil(spaceGrid / 2);
const space1 = spaceGrid;
const space2 = spaceGrid * 2;
const space3 = spaceGrid * 3;
const space4 = spaceGrid * 4;
const space6 = spaceGrid * 6;
const space8 = spaceGrid * 8;
const space11 = spaceGrid * 11;
const space16 = spaceGrid * 16;

export const gStyle = {
    activeOpacity: 0.7,
    container: {
        backgroundColor: colors.blackBg,
        flex: 1
    },
    containerAbsolute: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        zIndex: 50
    },

    // flex
    // ///////////////////////////////////////////////////////////////////////////
    flexCenter: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    flexRow: {
        flexDirection: 'row'
    },
    flexRowCenterAlign: {
        alignItems: 'center',
        flexDirection: 'row'
    },
    flexRowCenter: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    flexRowSpace: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    flex1: { flex: 1 },
    flex2: { flex: 2 },
    flex3: { flex: 3 },
    flex4: { flex: 4 },
    flex5: { flex: 5 },

    // text
    // ///////////////////////////////////////////////////////////////////////////
    textSpotify10: { fontFamily: fonts.spotifyRegular, fontSize: 10 },
    textSpotify12: { fontFamily: fonts.spotifyRegular, fontSize: 12 },
    textSpotify14: { fontFamily: fonts.spotifyRegular, fontSize: 14 },
    textSpotify16: { fontFamily: fonts.spotifyRegular, fontSize: 16 },
    textSpotify18: { fontFamily: fonts.spotifyRegular, fontSize: 18 },
    textSpotifyBold12: { fontFamily: fonts.spotifyBold, fontSize: 12 },
    textSpotifyBold16: { fontFamily: fonts.spotifyBold, fontSize: 16 },
    textSpotifyBold18: { fontFamily: fonts.spotifyBold, fontSize: 18 },
    textSpotifyBold20: { fontFamily: fonts.spotifyBold, fontSize: 20 },
    textSpotifyBold22: { fontFamily: fonts.spotifyBold, fontSize: 22 },
    textSpotifyBold24: { fontFamily: fonts.spotifyBold, fontSize: 24 },

    // spacers
    // ///////////////////////////////////////////////////////////////////////////
    spacer1: { height: space1 },
    spacer2: { height: space2 },
    spacer3: { height: space3 },
    spacer4: { height: space4 },
    spacer6: { height: space6 },
    spacer8: { height: space8 },
    spacer11: { height: space11 },
    spacer16: { height: space16 },

    spacer1W: { width: space1 },
    spacer2W: { width: space2 },
    spacer3W: { width: space3 },

    // margins
    // ///////////////////////////////////////////////////////////////////////////
    mB1: { marginBottom: space1 },
    mB2: { marginBottom: space2 },
    mB3: { marginBottom: space3 },

    mL1: { marginLeft: space1 },
    mL2: { marginLeft: space2 },
    mL3: { marginLeft: space3 },

    mR1: { marginRight: space1 },
    mR2: { marginRight: space2 },
    mR3: { marginRight: space3 },

    mTHalf: { marginTop: spaceHalf },
    mT1: { marginTop: space1 },
    mT2: { marginTop: space2 },
    mT3: { marginTop: space3 },

    mH1: { marginHorizontal: space1 },
    mH2: { marginHorizontal: space2 },
    mH3: { marginHorizontal: space3 },

    mV1: { marginVertical: space1 },
    mV2: { marginVertical: space2 },
    mV3: { marginVertical: space3 },

    // paddings
    // ///////////////////////////////////////////////////////////////////////////
    pHalf: { padding: spaceHalf },
    p1: { padding: space1 },
    p2: { padding: space2 },
    p3: { padding: space3 },

    pB1: { paddingBottom: space1 },
    pB2: { paddingBottom: space2 },
    pB3: { paddingBottom: space3 },

    pL1: { paddingLeft: space1 },
    pL2: { paddingLeft: space2 },
    pL3: { paddingLeft: space3 },

    pR1: { paddingRight: space1 },
    pR2: { paddingRight: space2 },
    pR3: { paddingRight: space3 },

    pT1: { paddingTop: space1 },
    pT2: { paddingTop: space2 },
    pT3: { paddingTop: space3 },

    pHHalf: { paddingHorizontal: spaceHalf },
    pH1: { paddingHorizontal: space1 },
    pH2: { paddingHorizontal: space2 },
    pH3: { paddingHorizontal: space3 }
};