// ThemeToggle.jsx
import { ToggleSwitch } from "../ToggleSwitch";

interface ThemeToggleProps {
    defaultDark?: boolean;
    onChange: (checked: boolean) => void
    width?: number | string;
    height?: number | string;
    ariaLabel?: string;
}
/**
 * ThemeToggle
 * Animated theme toggle (light / dark)
 *
 * @param {Object} props
 * @param {boolean} [props.defaultDark=false] - Initial state of the toggle (dark mode if true)
 * @param {function} props.onChange - Callback function when the toggle state changes
 * @param {number|string } [props.width] - Width of the toggle switch
 * @param {number|string } [props.height] - Height of the toggle switch
 * @param {string} [props.ariaLabel] - ARIA label for accessibility
 *
 * @returns {JSX.Element} The ThemeToggle component
 */
export const ThemeToggle: React.FC<ThemeToggleProps> = ({
    defaultDark = false,
    onChange,
    ariaLabel = "Toggle-theme"
}) => {

    return (
        <ToggleSwitch
            checked={defaultDark}
            id={`theme-toggle-switch-${ariaLabel}`}
            onChange={onChange}
            successColor='white'
            iconLeft='IconSun'
            iconRight='IconMoon'
        />
    );
};
