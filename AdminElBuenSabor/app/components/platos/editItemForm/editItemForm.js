'use strict';

var helpers = require('../../../utils/widgets/helper'),
    // additional requires
    dataService = require('../../../dataProviders/elBuenSabor'),
    Observable = require('data/observable').Observable,
    viewModel = new Observable({}),
    context;

var dialogs = require("ui/dialogs");

exports.getCategorias = function getCategorias() {
    var serviceCategorias = require('../../categorias/categorias-service');

    viewModel.set('isLoading', true);

    function _fetchData() {
        return serviceCategorias.getAllRecords();
    };
    _fetchData()
        .then(function (result) {
            var nombres = [], itemsList = [];

            result.forEach(function (item) {
                nombres.push(item.nombre);
                itemsList.push({
                    nombre: item.nombre,
                    Id: item.Id,
                });
            });
            viewModel.set('isLoading', false);
            dialogs.action({
                message: "Seleccione categoría",
                cancelButtonText: "Cancelar",
                actions: nombres
            }).then(function (result) {
                for (var i = 0; i < itemsList.length; i++) {
                    if (itemsList[i].nombre == result && result !== "cancelar") {
                        viewModel.set('categoria', itemsList[i].nombre);
                        viewModel.set('idCategoria', itemsList[i].Id);
                    }
                }
            });
        })
        .catch(function onCatch() {
            viewModel.set('isLoading', false);
        });
}

function goBack() {
    helpers.navigate({
        moduleName: 'components/platos/itemDetails/itemDetails',
        context: context
    });
}

function onRequestSuccess() {

    context.nombre = viewModel.get('nombreEdit');

    context.precio = viewModel.get('precio');

    context.categoria = viewModel.get('categoria');

    context.imagen = viewModel.get('imagen');

    context.dia = viewModel.get('dia');

    context.etiqueta = viewModel.get('etiqueta');

    context.tipo = viewModel.get('tipo');

    context.activo = viewModel.get('activoEdit');

    // refresh edited properties

    goBack();
}

function onRequestFail(err) {
    alert(JSON.stringify(err));
    return err;
}

exports.onCancelTap = function onCancelTap() {
    goBack();
};

exports.onSaveTap = function onSaveTap() {
    var data = dataService.data('platos');

    data.updateSingle({

        nombre: viewModel.get('nombreEdit'),

        precio: viewModel.get('precio'),

        categoria: viewModel.get('idCategoria'),

        imagen: viewModel.get('imagen'),

        dia: viewModel.get('dia'),

        etiqueta: viewModel.get('etiqueta'),

        tipo: viewModel.get('tipo'),

        activo: viewModel.get('activoEdit'),

        // save properties

        Id: viewModel.get('id')
    })
        .then(onRequestSuccess.bind(this))
        .catch(onRequestFail.bind(this));
};

function onNavigatedTo(args) {
    context = args.object.navigationContext;

    viewModel.set('id', context.Id);

    viewModel.set('nombreEdit', context.nombre);

    viewModel.set('precio', context.precio);

    viewModel.set('categoria', context.categoria);

    viewModel.set('idCategoria', context.categoria); //agregado

    viewModel.set('imagen', context.imagen);

    viewModel.set('dia', context.dia);

    viewModel.set('etiqueta', context.etiqueta);

    viewModel.set('tipo', context.tipo);

    viewModel.set('activoEdit', context.activo);

    // read properties

}
exports.onNavigatedTo = onNavigatedTo;

// additional functions
function pageLoaded(args) {
    var page = args.object;

    helpers.platformInit(page);

    page.bindingContext = viewModel;

    // additional pageLoaded
}

// START_CUSTOM_CODE_platosModel
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_platosModel
exports.pageLoaded = pageLoaded;