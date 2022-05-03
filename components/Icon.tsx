import PlayFill from "../assets/images/play-circle-fill.svg"
import {Platform,} from "react-native";
import {SvgProps} from "react-native-svg";

// @ts-ignore
// Use this to avoid bug with web builds. "Incorrect casing" or w/e for svgs
const Icon = ({ children }) => {
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