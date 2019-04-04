import React, { Component } from 'react';
import './Shops.css';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Theme, WithStyles, withStyles } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import { ShopModel } from '../../models/Shop-model';
import { addShop, editShop, getAllShops, removeShop } from '../../api';
import Shop from '../shop/Shop';
import isEmpty from 'lodash/isEmpty';

const styles = (theme: Theme) => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    backgroundColor: 'white',
    minWidth: 700,
  },
  fab: {
    margin: theme.spacing.unit,
  },
  button: {
    margin: theme.spacing.unit,
    right: -355,
  },
});

const initialValues = {
  shops: [] as Array<ShopModel>,
  selectedShop: {} as ShopModel,
  open: false,
};

type Props = WithStyles<typeof styles> & {}
type State = typeof initialValues & {};

class Shops extends Component<Props, State> {
  readonly state = initialValues;

  componentDidMount(): void {
    this.getAllShops();
  }

  getAllShops = (): void => {
    getAllShops()
      .then((res: Array<ShopModel>) => {
        res.sort(this.compareById());
        this.setState({...this.state, ...{shops: res}});
      });
  };

  compareById() {
    return function (a: ShopModel, b: ShopModel) {
      if (a.id < b.id) return -1;
      if (a.id > b.id) return 1;
      return 0;
    };
  }

  handleRowClick = (shop: ShopModel) => {
    this.setState({...this.state, ...{selectedShop: shop}});
  };

  handleRemoveRowClick = (id: number) => {
    console.log('remove shop', id);
    removeShop(id)
      .then((res: any) => {
        console.log(res);
        this.getAllShops();
      })
      .catch(rej => {
        console.log(rej);
      });
  };

  handleApply = (shop: ShopModel) => {
    if (shop.id === -1) {
      let newShop = {} as ShopModel;
      newShop.code = shop.code;
      newShop.address = shop.address;
      addShop(newShop)
        .then((res: any) => {
          console.log(res);
          this.getAllShops();
        })
        .catch(rej => {
          console.log(rej);
        });
    } else {
      editShop(shop)
        .then((res: any) => {
          console.log(res);
          this.getAllShops();
        })
        .catch(rej => {
          console.log(rej);
        });
    }
    this.setState({...this.state, ...{selectedShop: {} as ShopModel}});
  };

  render(): React.ReactNode {
    const {classes} = this.props;
    const {shops, selectedShop} = this.state;

    return (
      <div>
        {!isEmpty(selectedShop) && <Shop inputShop={selectedShop} handleApply={this.handleApply}/>}
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell align="right">Код</TableCell>
              <TableCell align="right">Адрес</TableCell>
              <TableCell align="right">Действие</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {shops.map(row => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row" align="right">{row.code}</TableCell>
                <TableCell align="right">{row.address}</TableCell>
                <TableCell align="right">
                  <Fab color="secondary" aria-label="Edit" size='small' className={classes.fab}
                       onClick={() => this.handleRowClick(row)}>
                    <Icon>edit_icon</Icon>
                  </Fab>
                  <Fab aria-label="Delete" size='small' className={classes.fab}
                       onClick={() => this.handleRemoveRowClick(row.id)}>
                    <Icon>delete_icon</Icon>
                  </Fab>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Fab color="primary" aria-label="Add" className={classes.button}
             onClick={() => this.handleRowClick({id: -1} as ShopModel)}>
          <Icon>add_icon</Icon>
        </Fab>
      </div>
    );
  }
}

export default withStyles(styles)(Shops);