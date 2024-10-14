import mongoose, {Schema, models} from 'mongoose';

// Define the interface for the User document
interface Client {
    firstname: string;
    lastname: string;
    createdDate: unknown;
    email: string;
    contactDetails: {
        phone: string;
        email: string;
        website: string;
    };
    address: {
        street: string;
        city: string;
        postalCode: string;
        country: string;
    },
    gdpr: boolean;
}

// Define the schema corresponding to the document interface
const clientSchema: Schema = new mongoose.Schema<Client>({
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    createdDate: {type: Date, default: Date.now},
    email: {type: String, required: true, unique: true},
    contactDetails: {
        phone: String,
        email: String,
        website: String,
    },
    address: {
        street: String,
        city: String,
        postalCode: String,
        country: String,
    },
    gdpr: {type: Boolean}
}, {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
});

// Check if the model already exists to prevent overwriting during hot reloads in development

const Client = models.Clients ||mongoose.model('Clients', clientSchema);

export default Client;