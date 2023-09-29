import J5Alert from "lib/components/J5Alert.vue";
import J5Icons from "lib/components/J5Icons/J5Icons.vue";
import J5Input from "lib/components/J5Inputs.vue";
import J5Selct from "lib/components/J5select.vue";
import { dic } from "lib/components/J5Icons/icons";
import { InpuModeType, OptionType } from "lib/shared/types";

const ICONS_NAMES = Object.keys(dic);

export { J5Alert, J5Icons, J5Input, J5Selct, ICONS_NAMES };
export type { InpuModeType, OptionType };
