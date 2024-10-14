import mongoose, {Schema, model, models} from 'mongoose';

// Define the interface for the User document
interface Participant {
    firstname: string;
    lastname: string;
    contact: {
        email: string,
        phone: string,
    },
    workshop?: string[]; // An array to store the workshop IDs associated with the participant
    gdpr: boolean;
}

// Define the schema corresponding to the document interface
const participantSchema: Schema = new mongoose.Schema<Participant>({
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    contact: {
        phone: String,
        email: {type: String, required: true},
    },
    gdpr: {type: Boolean},
    workshop: [{type: String}]
}, {
    timestamps: true, // Automatically adds createdAt and updatedAt fields

});

// Check if the model already exists to prevent overwriting during hot reloads in development
const Participant = models.Participant|| model('Participant', participantSchema);

export default Participant;