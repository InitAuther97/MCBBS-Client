import React, { useCallback } from "react";
import Reflux from "reflux";
import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router';
import PropTypes from "prop-types";
import classNames from "classnames";
import shortid from "shortid";

import { withStyles } from "@material-ui/core/styles";
import Fade from "@material-ui/core/Fade";
import Grow from '@material-ui/core/Grow';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import Stores from '../../resourceManager/stores';
import Actions from "../../resourceManager/actions";

const styles = theme => ({

});

class MainWindowManager extends Reflux.Component {
  constructor(props) {
    super(props);
    this.store = Stores.view.global.dialog;
  }

  handleCloseDialog = () => Actions.view.global.dialog.toggleTo('');

  render() {
    const { classes, theme } = this.props;

    return (
      <Dialog
        open={this.state.show == 'about'}
        onClose={this.handleCloseDialog}
      >
        <DialogTitle>关于</DialogTitle>
        <DialogContent>
          <Typography paragraph variant="body1">
            {"贡献者"}
          </Typography>
          <Typography paragraph variant="body1">
            {"@langyo "}
            <Button onClick={() => shell.openExternal("http://www.mcbbs.net/?1287472")}>MCBBS</Button>{" "}
            <Button onClick={() => shell.openExternal("https://github.com/langyo")}>GitHub</Button>{" "}
            <Button onClick={() => shell.openExternal("https://afdian.net/@langyo")}>爱发电</Button>
          </Typography>
          <Typography paragraph variant="body1">
            {"@simon300000 "}
            <Button onClick={() => shell.openExternal("http://www.mcbbs.net/?155499")}>MCBBS</Button>{" "}
            <Button onClick={() => shell.openExternal("https://github.com/simon300000")}>GitHub</Button>
          </Typography>
          <Typography paragraph variant="body1">
            {"@纪华裕 "}
            <Button onClick={() => shell.openExternal("http://www.mcbbs.net/?2460223")}>MCBBS</Button>{" "}
            <Button onClick={() => shell.openExternal("https://github.com/jihuayu")}>GitHub</Button>
          </Typography>
          <Typography paragraph variant="body1">
            {"@阴阳师元素祭祀 "}
            <Button onClick={() => shell.openExternal("http://www.mcbbs.net/?458143")}>MCBBS</Button>{" "}
            <Button onClick={() => shell.openExternal("https://github.com/euOnmyoji")}>GitHub</Button>
          </Typography>
          <Typography paragraph variant="body1">
            {"@姚氏帅哥 "}
            <Button onClick={() => shell.openExternal("http://www.mcbbs.net/?378563")}>MCBBS</Button>{" "}
            <Button onClick={() => shell.openExternal("https://github.com/Yaossg")}>GitHub</Button>
          </Typography>
          <Typography paragraph variant="body1">
            {"@InitAuther97 "}
            <Button onClick={() => shell.openExternal("https://github.com/InitAuther97")}>GitHub</Button>
          </Typography>
          <Typography paragraph variant="body1">
            <Button
              className={classes.button}
              variant="outlined"
              color="primary"
              onClick={() => shell.openExternal("https://github.com/langyo/MCBBS-Client")}
            >
              {"该项目在 GitHub 的开源仓库地址"}
            </Button>
            <Button
              className={classes.button}
              variant="outlined"
              color="primary"
              disabled
              onClick={() => shell.openExternal("http://www.mcbbs.net/")}
            >
              {"该项目在 MCBBS 的发布贴"}
            </Button>
          </Typography>
          <Typography paragraph variant="body1">
            {"当前版本 0.2.6"}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleCloseDialog} color="primary">
            OK
            </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(styles)(MainWindowManager);
