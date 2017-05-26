import Button from "./button/button.vue";
import Panel from "./panel/panel.vue";
import Actionsheet from "./actionsheet/actionsheet.vue";
import Picker from "./picker/picker.vue";
import Pickerarea from "./picker/picker-area.vue";
import Pickertime from "./picker/picker-time.vue";
import Pickerdate from "./picker/picker-date.vue";

const wxComponets = {
  button: Button,
  panel: Panel,
  actionsheet: Actionsheet,
  picker: Picker,
  pickerarea: Pickerarea,
  pickertime: Pickertime,
  pickerdate: Pickerdate
};

Object.keys(wxComponets).forEach(key => {
  Vue.component("wx-" + key, wxComponets[key]);
});
