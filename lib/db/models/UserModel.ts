import mongoose, {Schema, model, models} from 'mongoose';

// Define the interface for the User document
interface User {
    firstname: string;
    lastname: string;
    email: string;
    gdpr: boolean;
    createdDate: unknown
}

// Define the schema corresponding to the document interface
const userSchema: Schema = new mongoose.Schema<User>({
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    gdpr: {type: Boolean}
}, {
    timestamps: true, // Automatically adds createdAt and updatedAt fields

});

// Check if the model already exists to prevent overwriting during hot reloads in development
const User = models.Users||model('Users', userSchema);

export default User;