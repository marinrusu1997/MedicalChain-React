export class ObjectDecorator {
   static removeProperty = (object, property) => {
      const { [property]: deletedProperty, ...otherProperties } = object
      return otherProperties
   }

   static addProperty = (object, property, value) => {
      object[property] = value
      console.log(object)
      return object
   }
}