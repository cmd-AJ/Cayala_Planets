const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
    },
    correo: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    telefono: {
      type: String,
      required: true,
    },
    kids: {
      type: String,
      required: true,
    },
    adultos: {
      type: String,
      required: true,
    },
    planeta_0: {
      type: Boolean,
      default: false,
    },
    planeta_1: {
      type: Boolean,
      default: false,
    },
    planeta_2: {
      type: Boolean,
      default: false,
    },
    planeta_3: {
      type: Boolean,
      default: false,
    },
    planeta_4: {
      type: Boolean,
      default: false,
    },
    planeta_5: {
      type: Boolean,
      default: false,
    },
    planeta_6: {
      type: Boolean,
      default: false,
    },
    planeta_7: {
      type: Boolean,
      default: false,
    },
    juegoVecesCompletado: {
      type: Number,
      default: 0,
    },
    ganador: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // Agrega automáticamente `createdAt` y `updatedAt`
    collection: 'hyper'
  }
);

module.exports = mongoose.model("User", userSchema);
