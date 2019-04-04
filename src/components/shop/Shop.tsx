import React, { Component } from 'react';
import './Shop.css';
import Dialog from '@material-ui/core/Dialog';
import { ShopModel } from '../../models/Shop-model';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import { Theme, withStyles, WithStyles } from '@material-ui/core';
import cloneDeep from 'lodash/cloneDeep';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const styles = (theme: Theme) => ({
    button: {
        margin: theme.spacing.unit,
    },
});

const initialValues = {
    shop: {} as ShopModel,
};

type State = typeof initialValues & {};

type Props = WithStyles<typeof styles> & {
    inputShop: ShopModel,
    handleApply: (newShop: ShopModel) => void,
};

class Shop extends Component<Props, State> {
    readonly state = initialValues;

    componentDidMount(): void {
        const {inputShop} = this.props;
        this.setState({...this.state, ...{shop: cloneDeep(inputShop)}});
    }

    handleClose = (shop: ShopModel) => {
        const {handleApply} = this.props;
        handleApply && handleApply(shop);
    };

    handleChange = (e: any) => {
        const target = e.target;
        // const value = target.type === 'checkbox' ? target.checked : target.value;
        const value: string = target.value;
        const name = target.name as keyof ShopModel;
        this.setState({...this.state, ...{
            shop: {...this.state.shop, ...{[name]: value} } as ShopModel
        }});
    }

    render(): React.ReactNode {
        const {classes} = this.props;
        const {shop} = this.state;

        return (
            <Dialog
                disableBackdropClick
                disableEscapeKeyDown
                open={true}>
                <DialogTitle id="confirmation-dialog-title">
                    {shop.id === -1 && <span>Создание нового магазина</span>}
                    {shop.id !== -1 && <span>Редактирование магазина</span>}
                </DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="code"
                        label="Код магазина"
                        type="text"
                        fullWidth
                        value={shop.code}
                        onChange={this.handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="address"
                        label="Адрес магазина"
                        type="text"
                        fullWidth
                        value={shop.address}
                        onChange={this.handleChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="secondary" className={classes.button}
                            onClick={() => this.handleClose({} as ShopModel)}>
                        Отмена
                    </Button>
                    <Button variant="contained" color="primary" className={classes.button}
                            onClick={() => this.handleClose(shop)}>
                        Сохранить
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default withStyles(styles)(Shop);
