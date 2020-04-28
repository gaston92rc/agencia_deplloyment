const Testimonial = require('../models/Testimoniales');

exports.mostrarTestimoniales = async (req, res) => {
    const testimoniales = await Testimonial.findAll();
    res.render('testimoniales', {
        pagina: 'Testimoniales',
        testimoniales
    });
};

exports.agregarTestimonial = async (req, res) => {
    let { nombre, correo, mensaje } = req.body;
    console.log("BODYYYYY: " + req.body);
    let errores = [];
    if (!nombre) {
        errores.push({ 'mensaje': 'Agrega tu nombre' });
    }
    if (!correo) {
        errores.push({ 'mensaje': 'Agrega tu correo' });
    }
    if (!mensaje) {
        errores.push({ 'mensaje': 'Agrega tu mensaje' });
    }
    console.log("ERRORES: " + errores);
    if (errores.length > 0) {
        // muestra la vista con errores
        const testimoniales = await Testimonial.findAll();
        res.render('testimoniales', {
            pagina: 'Testimoniales',
            testimoniales,
            errores,
            nombre,
            correo,
            mensaje
        });

    } else {
        // almacenarlo en la db
        await Testimonial.create({
            nombre,
            correo,
            mensaje
        })
        res.redirect('/testimoniales');

    }
};