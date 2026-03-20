import { styles } from "../constants/theme";

function Field(props) {
  var label = props.label;
  var value = props.value;
  var onChange = props.onChange;
  var prefix = props.prefix;
  var suffix = props.suffix;
  var min = props.min;
  var max = props.max;
  var step = props.step || 1;

  return (
    <div style={styles.fieldGroup}>
      <label style={styles.label}>{label}</label>
      <div style={styles.inputWrap}>
        {prefix && <span style={styles.inputPrefix}>{prefix}</span>}
        <input
          type="number"
          value={value}
          min={min}
          max={max}
          step={step}
          onChange={function (e) {
            onChange(Number(e.target.value));
          }}
          style={{
            ...styles.input,
            paddingLeft: prefix ? 28 : 14,
            paddingRight: suffix ? 44 : 14,
          }}
        />
        {suffix && <span style={styles.inputSuffix}>{suffix}</span>}
      </div>
    </div>
  );
}

export default Field;
