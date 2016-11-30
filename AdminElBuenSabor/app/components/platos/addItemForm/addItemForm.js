'use strict';

var isInit = true,
    helpers = require('../../../utils/widgets/helper'),
    // additional requires
    dataService = require('../../../dataProviders/elBuenSabor'),
    viewModel = require('./addItemForm-view-model');

var dialogs = require("ui/dialogs");

exports.getCategorias = function getCategorias() {
    dialogs.action({
        message: "Seleccione categoría",
        cancelButtonText: "Cancelar",
        actions: ["Option1", "Option2"]
    }).then(function (result) {
        viewModel.set('categoria',result);
    });
}

function onRequestSuccess() {
    helpers.back();
}

function onRequestFail(err) {
    alert(JSON.stringify(err));
    return err;
}

exports.onCancelTap = function onCancelTap() {
    helpers.back();
};

exports.onSaveTap = function onSaveTap() {
    var data = dataService.data('platos');

    data.save({

        nombre: viewModel.get('nombreAdd'),

        precio: viewModel.get('precio'),

        categoria: viewModel.get('categoria'),

        imagen: viewModel.get('imagen'),

        dia: viewModel.get('dia'),

        etiqueta: viewModel.get('etiqueta'),

        tipo: viewModel.get('tipo'),

        activo: viewModel.get('activoAss'),

        // save properties

    })
        .then(onRequestSuccess.bind(this))
        .catch(onRequestFail.bind(this));
};

// additional functions
function pageLoaded(args) {
    var page = args.object;

    helpers.platformInit(page);

    viewModel.set('nombreAdd', '');

    viewModel.set('precio', '');

    viewModel.set('categoria', '');

    viewModel.set('imagen', '');

    viewModel.set('dia', '');

    viewModel.set('etiqueta', '');

    viewModel.set('tipo', '');

    viewModel.set('activoAss', '');

    // init properties

    page.bindingContext = viewModel;

    // additional pageLoaded
}

// START_CUSTOM_CODE_platosModel
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_platosModel
exports.pageLoaded = pageLoaded;