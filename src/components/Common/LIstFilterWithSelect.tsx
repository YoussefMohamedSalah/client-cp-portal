import * as React from "react";
import { useTheme, styled } from "@mui/material/styles";
import Popper from "@mui/material/Popper";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import SettingsIcon from "@mui/icons-material/Settings";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import Autocomplete, { AutocompleteCloseReason, autocompleteClasses } from "@mui/material/Autocomplete";
import InputBase from "@mui/material/InputBase";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";

interface PopperComponentProps {
  anchorEl?: any;
  disablePortal?: boolean;
  open: boolean;
}

const StyledAutocompletePopper = styled("div")(({ theme }) => ({
  [`& .${autocompleteClasses.paper}`]: {
    boxShadow: "none",
    margin: 0,
    color: "inherit",
    fontSize: 13,
  },
  [`& .${autocompleteClasses.listbox}`]: {
    backgroundColor: theme.palette.mode === "light" ? "#fff" : "#1c2128",
    padding: 0,
    [`& .${autocompleteClasses.option}`]: {
      minHeight: "auto",
      alignItems: "flex-start",
      padding: 8,
      borderBottom: `1px solid  ${theme.palette.mode === "light" ? " #eaecef" : "#30363d"}`,
      '&[aria-selected="true"]': {
        backgroundColor: "transparent",
      },
      [`&.${autocompleteClasses.focused}, &.${autocompleteClasses.focused}[aria-selected="true"]`]: {
        backgroundColor: theme.palette.action.hover,
      },
    },
  },
  [`&.${autocompleteClasses.popperDisablePortal}`]: {
    position: "relative",
  },
}));

function PopperComponent(props: PopperComponentProps) {
  const { disablePortal, anchorEl, open, ...other } = props;
  return <StyledAutocompletePopper {...other} />;
}

const StyledPopper = styled(Popper)(({ theme }) => ({
  border: `1px solid ${theme.palette.mode === "light" ? "#e1e4e8" : "#30363d"}`,
  boxShadow: `0 8px 24px ${theme.palette.mode === "light" ? "rgba(149, 157, 165, 0.2)" : "rgb(1, 4, 9)"}`,
  borderRadius: 6,
  width: 300,
  zIndex: theme.zIndex.modal,
  fontSize: 13,
  color: theme.palette.mode === "light" ? "#24292e" : "#c9d1d9",
  backgroundColor: theme.palette.mode === "light" ? "#fff" : "#1c2128",
}));

const StyledInput = styled(InputBase)(({ theme }) => ({
  padding: 10,
  width: "100%",
  borderBottom: `1px solid ${theme.palette.mode === "light" ? "#eaecef" : "#30363d"}`,
  "& input": {
    borderRadius: 4,
    backgroundColor: theme.palette.mode === "light" ? "#fff" : "#0d1117",
    padding: 8,
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    border: `1px solid ${theme.palette.mode === "light" ? "#eaecef" : "#30363d"}`,
    fontSize: 14,
    "&:focus": {
      boxShadow: `0px 0px 0px 3px ${theme.palette.mode === "light" ? "rgba(3, 102, 214, 0.3)" : "rgb(12, 45, 107)"}`,
      borderColor: theme.palette.mode === "light" ? "#0366d6" : "#388bfd",
    },
  },
}));

export interface IOption {
  label: string;
  value: number | string;
}

interface Props {
  baseOptions: IOption[];
  selectedOptions: IOption[];
  btnText: string;
  headerText: string;
}

export default function ListFilterWithSelect({ baseOptions, selectedOptions, btnText, headerText }: Props) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [value, setValue] = React.useState<IOption[]>([...selectedOptions]);
  const [pendingValue, setPendingValue] = React.useState<IOption[]>([]);
  const theme = useTheme();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setPendingValue(value);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setValue(pendingValue);
    if (anchorEl) {
      anchorEl.focus();
    }
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'github-label' : undefined;

  return (
    <React.Fragment>
      <Box sx={{ width: 221, fontSize: 13 }}>
        <Button
          disableRipple
          aria-describedby={id}
          onClick={handleClick}
          size="small"
          variant="contained"
          className="bg-primary text-white"
          startIcon={<SettingsIcon />}
        >
          {btnText}: {selectedOptions?.length!}
        </Button>
      </Box>
      <StyledPopper id={id} open={open} anchorEl={anchorEl} placement="bottom-start">
        <ClickAwayListener onClickAway={handleClose}>
          <div>
            <Box
              sx={{
                borderBottom: `1px solid ${theme.palette.mode === "light" ? "#eaecef" : "#30363d"}`,
                padding: "8px 10px",
                fontWeight: 600,
              }}
            >
              {headerText}
            </Box>
            <Autocomplete
              open
              multiple
              onClose={(
                event: React.ChangeEvent<{}>,
                reason: AutocompleteCloseReason,
              ) => {
                if (reason === 'escape') {
                  handleClose();
                }
              }}
              value={pendingValue}
              onChange={(event, newValue, reason) => {
                if (
                  event.type === 'keydown' &&
                  (event as React.KeyboardEvent).key === 'Backspace' &&
                  reason === 'removeOption'
                ) {
                  return;
                }
                setPendingValue(newValue);
              }}
              disableCloseOnSelect
              PopperComponent={PopperComponent}
              renderTags={() => null}
              noOptionsText="No labels"
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Box
                    component={DoneIcon}
                    sx={{ width: 17, height: 17, mr: '5px', ml: '-2px' }}
                    style={{
                      visibility: selected ? 'visible' : 'hidden',
                    }}
                  />
                  <Box
                    sx={{
                      flexGrow: 1,
                      '& span': {
                        color:
                          theme.palette.mode === 'light' ? '#586069' : '#8b949e',
                      },
                    }}
                  >
                    {option.label}
                  </Box>
                  <Box
                    component={CloseIcon}
                    sx={{ opacity: 0.6, width: 18, height: 18 }}
                    style={{
                      visibility: selected ? 'visible' : 'hidden',
                    }}
                  />
                </li>
              )}
              options={[...baseOptions].sort((a, b) => {
                // Display the selected baseOptions first.
                let ai = selectedOptions.indexOf(a);
                ai = ai === -1 ? selectedOptions.length + baseOptions.indexOf(a) : ai;
                let bi = selectedOptions.indexOf(b);
                bi = bi === -1 ? selectedOptions.length + baseOptions.indexOf(b) : bi;
                return ai - bi;
              })}
              getOptionLabel={(option) => option.label}
              renderInput={(params) => (
                <StyledInput
                  ref={params.InputProps.ref}
                  inputProps={params.inputProps}
                  autoFocus
                  placeholder="Filter labels"
                />
              )}
            />
          </div>
        </ClickAwayListener>
      </StyledPopper>
    </React.Fragment>
  );
}
