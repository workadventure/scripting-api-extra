import { ITiledMapObject, ITiledMapProperty } from '@workadventure/tiled-map-type-guard/dist';

export class Properties {
  public constructor(private properties: ITiledMapProperty[]) {
  }

  public getMany(name: string): (string|boolean|number|undefined)[] {
    return this.properties.filter(property => property.name === name).map(property => property.value);
  }

  public getOne(name: string): string|boolean|number|undefined {
    const values = this.getMany(name);
    if (values.length > 1) {
      throw new Error('Expected only one property to be named "'+name+'"');
    }
    if (values.length === 0) {
      return undefined;
    }
    return values[0];
  }
}

class VariableDescriptor {
  public readonly name;
  public readonly properties;

  public constructor(object: ITiledMapObject) {
    this.name = object.name;
    this.properties = new Properties(object.properties ?? []);
  }
}

export async function getAllVariables(): Promise<Map<string, VariableDescriptor>> {
  const map = await WA.room.getTiledMap();

  const variables = new Map<string, VariableDescriptor>();

  for (const layer of map.layers) {
    if (layer.type === 'objectgroup') {
      for (const object of layer.objects) {
        if (object.type === 'variable') {
          variables.set(object.name, new VariableDescriptor(object));
        }
      }
    }
  }

  return variables;
}
