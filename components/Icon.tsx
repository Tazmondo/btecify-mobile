import PlayFill from "../assets/images/play-circle-fill.svg"
import Pause from '../assets/images/pause-fill.svg'
import Play from '../assets/images/play-fill.svg'
import SkipEndFill from '../assets/images/skip-end-fill.svg'
import {Platform,} from "react-native";
import {SvgProps} from "react-native-svg";

// @ts-ignore
// Use this to avoid bug with web builds. "Incorrect casing" or w/e for svgs
const Icon = ({children}) => {
    if (Platform.OS === 'web') {
        return <img src={children.type} {...children.props} alt="An icon"/>;
    }
    return children;
};

export function PlayFillSVG(props: SvgProps) {
    return <Icon>
        <PlayFill {...props}/>
    </Icon>
}

export function PauseSVG(props: SvgProps) {
    return <Icon>
        <Pause {...props}/>
    </Icon>
}

export function PlaySVG(props: SvgProps) {
    return <Icon>
        <Play {...props}/>
    </Icon>
}

export function SkipSVG(props: SvgProps) {
    return <Icon>
        <SkipEndFill {...props}/>
    </Icon>
}