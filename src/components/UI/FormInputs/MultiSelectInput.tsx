import { useAutocomplete, AutocompleteGetTagProps } from "@mui/base/useAutocomplete";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
import { autocompleteClasses } from "@mui/material/Autocomplete";
import { IOption } from "types/Forms/option";

interface Props {
  label?: string;
  defaultValue?: IOption[];
  options: IOption[];
  onChange: (value: string | any) => void;
  disabled?: boolean;
  placeholder?: string;
}

const Root = styled("div")(
  ({ theme }) => `
  font-size: 14px;
  position: relative;
`,
);

const Label = styled("label")`
  padding: 0 0 4px;
  line-height: 1.5;
  display: block;
`;

const InputWrapper = styled("div")(
  ({ theme }) => `
  border-radius: 4px;
  padding: 3px;
  display: flex;
  flex-wrap: wrap;
  border: 1px solid #888888!important;

  &.focused {
    box-shadow: #888888!important;
  }

  & input {
    background-color: transparent;
    height: 30px;
    box-sizing: border-box;
    padding: 4px 6px;
    width: 0;
    min-width: 30px;
    flex-grow: 1;
    border: 0;
    margin: 0;
    outline: 0;
  }
`,
);

interface TagProps extends ReturnType<AutocompleteGetTagProps> {
  label: string;
}

function Tag(props: TagProps) {
  const { label, onDelete, ...other } = props;
  return (
    <div {...other}>
      <span>{label}</span>
      <CloseIcon onClick={onDelete} />
    </div>
  );
}

const StyledTag = styled(Tag)<TagProps>(
  ({ theme }) => `
  display: flex;
  align-items: center;
  height: 24px;
  margin: 2px;
  line-height: 22px;
  border: 1px solid #666666;
  border-radius: 2px;
  box-sizing: content-box;
  padding: 0 4px 0 10px;
  outline: 0;
  overflow: hidden;

  & span {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  & svg {
    font-size: 12px;
    cursor: pointer;
    padding: 0px;
    margin: 0px 5px;
  }
`,
);

const Listbox = styled("ul")(
  ({ theme }) => `
  margin: 2px 0 0;
  padding: 0;
  position: absolute;
  list-style: none;
  background-color: #7a7a7a!important;
  overflow: auto;
  max-height: 250px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 1;
  width: 100%; /* Set the width to 100% */

  & li {
    padding: 5px 12px;
    display: flex;

    & span {
      flex-grow: 1;
    }

    & svg {
      color: transparent;
    }
  }

  & li[aria-selected='true'] {
    background-color: "#888888!important";
    font-weight: 600;

    & svg {
      color: #1890ff;
    }
  }

  & li.${autocompleteClasses.focused} {
    background-color: "#b4afaf!important";
    cursor: pointer;

    & svg {
      color: currentColor;
    }
  }
`,
);

const MultiSelectInput = ({ options, label, onChange, defaultValue, disabled, placeholder }: Props) => {
  const {
    getRootProps,
    getInputLabelProps,
    getInputProps,
    getTagProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
    value,
    focused,
    setAnchorEl,
  } = useAutocomplete({
    id: "customized-hook-demo",
    disabled,
    value: defaultValue,
    multiple: true,
    options: options,
    getOptionLabel: (option) => option?.label! || "",
    onChange: (event, newValue) => {
      onChange(newValue!);
    },
  });

  return (
    <Root>
      <div {...getRootProps()}>
        <Label {...getInputLabelProps()}>{label! || ""}</Label>
        <InputWrapper ref={setAnchorEl} className={focused ? "focused" : ""}>
          {value.map((option: IOption, index: number) => (
            <StyledTag label={option?.label! || ""} {...getTagProps({ index })} />
          ))}
          <input {...getInputProps()!} />
        </InputWrapper>
      </div>
      {groupedOptions && groupedOptions?.length > 0 ? (
        <Listbox {...getListboxProps()}>
          {(groupedOptions as typeof options)?.map((option, index) => (
            <li {...getOptionProps({ option, index })}>
              <span>{option?.label! || ""}</span>
              <CheckIcon fontSize="small" />
            </li>
          ))}
        </Listbox>
      ) : null}
    </Root>
  );
};

export default MultiSelectInput;
